import { AuthUser } from './auth-user.interface';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
