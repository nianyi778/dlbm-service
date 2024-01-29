import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: AuthService,
  ) {
    //
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    // 执行身份验证逻辑...
    const { username, password } = credentials;
    const cur = await this.userService.findOne(username);
    console.log('login', cur);
    if (cur) {
      throw new ConflictException('用户名已存在');
    }
    // 如果验证成功，生成令牌
    const result = await this.userService.createUser({ username, password });
    console.log(result, '-=-=-result');
    const token = this.jwtService.generateToken({ username, password });

    // 返回令牌给客户端
    return { token };
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
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
