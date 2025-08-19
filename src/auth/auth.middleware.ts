import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UsersService } from '../models/users/users.service';
import logger from '../../winston.config';

dotenv.config();

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface CustomRequest extends Request {
  user?: AuthUser;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.path === '/auth/login') {
      return next();
    }

    const authHeader = req.headers['authorization'];
    const token =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
      logger.info('Token is missing');
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET) as {
        userId: number;
      };

      const userResponse = await this.usersService.findOne(decoded.userId);

      const user = userResponse.data;

      if (!user) {
        logger.info(`User not found for ID: ${decoded.userId}`);
        throw new UnauthorizedException('User not found');
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      next();
    } catch (error) {
      logger.info('Invalid token', error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
