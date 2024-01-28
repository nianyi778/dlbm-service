import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class LoginController {
  constructor(private readonly jwtService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Body() credentials: any) {
    // 执行身份验证逻辑...

    console.log(credentials, 'credentials');

    // 如果验证成功，生成令牌
    const token = this.jwtService.generateToken({ userId: 1 });

    // 返回令牌给客户端
    return { token };
  }

  @Post('verify')
  verifyToken(@Body() tokenInfo: { token: string }) {
    const isValid = this.jwtService.validateToken(tokenInfo.token);

    if (isValid) {
      // 令牌验证通过
      return { valid: true };
    } else {
      // 令牌验证失败
      return { valid: false };
    }
  }
}
