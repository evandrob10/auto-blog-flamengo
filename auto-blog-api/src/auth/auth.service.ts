import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly JwtService: JwtService,
  ) {}

  async auth(email: string, password: string) {
    const user = await this.UserService.findOne(email);
    if (password !== user?.password) return false;
    const token = await this.jwt(user);
    return token;
  }

  async jwt(user: CreateUserDto) {
    const payload = {
      userID: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return await this.JwtService.signAsync(payload);
  }

  async verifyToken(token: string) {
    const payload: AuthDto = await this.JwtService.verifyAsync(token, {
      secret: process.env.SECRET_JWT,
    });
    return payload;
  }
}
