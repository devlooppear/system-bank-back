import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  login(createAuthDto: CreateAuthDto) {
    return {
      message: 'Login realizado com sucesso',
      user: createAuthDto,
    };
  }

  logout(userId: number) {
    return {
      message: 'Logout realizado com sucesso',
      userId: userId,
    };
  }
}
