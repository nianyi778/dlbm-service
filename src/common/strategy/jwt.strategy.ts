import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '@/constants/jwt';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const { secret } = jwtConfig();
    super({
      // 分别传入这些参数
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 当 ignoreExpiration 设置为 true 时，即使 JWT 的过期时间已经过去，仍然会被视为有效。这意味着即使 JWT 过期，也不会引发过期错误，允许继续使用该令牌。
      secretOrKey: secret,
    });
  }

  // 成功才会到这
  async validate(payload: { username: string }) {
    const user = await this.authService.validateUser(payload.username);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    return payload;
  }
}
