import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';

@Injectable() // 通过 PassportStrategy 使用 local 策略
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string) {
    const user = await this.authService.validateToken(token);
    console.log(user, token, '-=-=-');
    if (!user) {
      throw new UnauthorizedException('未授权'); // 返回 '未授权' 错误 (401)
    }
    return user; // 返回用户信息
  }
}
