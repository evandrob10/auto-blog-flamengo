import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
      });
    return {
      access: 'autorizado!',
    };
  }
  @Post('/verifyToken')
  async verifyToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token: string = req?.cookies?.token as string;
    try {
      if (token) {
        const user = await this.AuthService.verifyToken(token);
        return user;
      } else {
        return {
          access: false,
        };
      }
    } catch {
      res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
      });
      return {
        access: false,
      };
    }
  }
}
