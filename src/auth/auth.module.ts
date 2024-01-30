import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@/constants/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@/common/strategy/jwt.strategy';
import { LocalStrategy } from '@/common/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }), // 配置默认策略
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {
  // 123
}
