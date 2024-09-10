import { Controller, Post, Body, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Delete('logout')
  logout(@Body('user_id') userId: number) {
    if (!userId || typeof userId !== 'number') {
      throw new UnauthorizedException('Invalid user ID');
    }
    return this.authService.logout(userId);
  }
}
