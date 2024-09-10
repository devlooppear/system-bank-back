import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import logger from 'winston.config';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  private readonly prisma = new PrismaClient();

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        logger.warn(`Login failed: No user found with email ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        logger.warn(`Login failed: Invalid password for user ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      await this.deleteOldTokens(user.id);

      const token = this.generateJwt(user.id, user.email);
      await this.storeJwtToken(user.id, token);

      return {
        message: 'User logged in',
        token,
      };
    } catch (error) {
      logger.error('Error during login process: ', error);
      throw new InternalServerErrorException('An error occurred during login');
    }
  }

  private generateJwt(userId: number, email: string): string {
    try {
      const payload = { userId, email };

      const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
      return token;
    } catch (error) {
      logger.error('Error generating JWT: ', error);
      throw new InternalServerErrorException('Error generating JWT');
    }
  }

  private async storeJwtToken(userId: number, token: string) {
    try {
      await this.prisma.personalAccessToken.create({
        data: {
          token,
          user_id: userId,

          expires_at: new Date(Date.now() + 3 * 60 * 60 * 1000),
        },
      });
    } catch (error) {
      logger.error(`Error storing JWT token for user ID ${userId}: `, error);
      throw new InternalServerErrorException('Error storing token');
    }
  }

  private async deleteOldTokens(userId: number) {
    try {
      await this.prisma.personalAccessToken.deleteMany({
        where: { user_id: userId },
      });
    } catch (error) {
      logger.error(`Error deleting old tokens for user ID ${userId}: `, error);
      throw new InternalServerErrorException('Error deleting old tokens');
    }
  }

  async logout(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        logger.warn(`Logout failed: No user found with ID ${userId}`);
        throw new UnauthorizedException('User not found');
      }

      await this.prisma.personalAccessToken.deleteMany({
        where: { user_id: userId },
      });
      logger.info(`User ID ${userId} logged out successfully`);
      return { message: 'User logged out' };
    } catch (error) {
      logger.error(`Error logging out user ID ${userId}: `, error);
      throw new InternalServerErrorException('Error during logout');
    }
  }

  async validateToken(token: string) {
    try {
      const foundToken = await this.prisma.personalAccessToken.findUnique({
        where: { token },
      });

      if (!foundToken || foundToken.expires_at < new Date()) {
        logger.warn(
          `Token validation failed: Invalid or expired token ${token}`,
        );
        throw new UnauthorizedException('Token is invalid or expired');
      }

      const decoded = verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      logger.error('Error during token validation: ', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
