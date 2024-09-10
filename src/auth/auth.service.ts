import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly prisma = new PrismaClient();

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateJwt(user.id, user.email);

    return {
      message: 'User logged in',
      userId: user.id,
      token,
    };
  }

  private generateJwt(userId: number, email: string) {
    const payload = { userId, email };
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  async logout(userId: number) {
    return { message: 'User logged out' };
  }
}
