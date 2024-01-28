import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@/constants/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@/common/strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
  // 123
}
