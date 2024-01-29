import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly jwtService: AuthService) {
    //
  }

  @Post('login')
  login(@Body() credentials: { username: string; password: string }) {
    // 执行身份验证逻辑...

    console.log('login', credentials);
    // 如果验证成功，生成令牌
    const token = this.jwtService.generateToken(credentials);

    // 返回令牌给客户端
    return { token };
  }

  @Post('verify')
  @UseGuards(AuthGuard('jwt'))
  verifyToken(@Req() request) {
    console.log(request.user);

    return '123';

    // const isValid = this.jwtService.validateToken(tokenInfo.token);

    // if (isValid) {
    //   // 令牌验证通过
    //   return { valid: true };
    // } else {
    //   // 令牌验证失败
    //   return { valid: false };
    // }
  }
}
