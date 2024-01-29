import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '@/constants/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 分别传入这些参数
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // 是否校验过期
      secretOrKey: jwtConfig.secret,
    });
  }

  // 成功才会到这
  async validate(payload: any) {
    const userId = false;
    if (!userId) {
      throw new UnauthorizedException('用户不存在');
    }
    return payload;
  }
}
