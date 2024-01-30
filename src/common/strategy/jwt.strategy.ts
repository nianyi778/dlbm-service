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
      ignoreExpiration: true, // 是否校验过期
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
