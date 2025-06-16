import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post()
  async auth(
    @Body() { email, password }: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.AuthService.auth(email, password);
    if (token)
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60,
      });
    return {
      acess: 'autorizado!',
    };
  }
  @Post()
  verifyToken(@Body('token') token: string) {
    return this.AuthService.verifyToken(token);
  }
}
