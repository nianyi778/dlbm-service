import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  ConflictException,
  Res,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserService } from './user.service';
import { Response } from 'express';
import { ClientTypeEnum, ClientType } from '@/common/decorators';
import { mergeResTemplate } from 'utils/util';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: AuthService,
  ) {
    //
  }

  @Post('register')
  async register(@Body() credentials: { username: string; password: string }) {
    const { username, password } = credentials;
    const cur = await this.userService.findOne(username);
    if (cur) {
      throw new ConflictException('用户名已注册');
    }
    // 写入磁盘
    const result = await this.userService.createUser({ username, password });
    if (!result) {
      throw new ConflictException('服务异常，请重试！');
    }
    return '注册成功';
  }

  @Post('login')
  async login(
    @ClientType() clientType: ClientTypeEnum,
    @Body() credentials: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = credentials;
    const cur = await this.userService.findOne(username, password);
    if (!cur) {
      throw new ConflictException('用户名不存在');
    }

    // 如果验证成功，生成令牌
    const token = this.jwtService.generateToken({ username });
    if (clientType === ClientTypeEnum.WEB) {
      res.cookie('Authorization', token, {
        maxAge: 24 * 60 * 60, // 1 day
        httpOnly: true, // 限制只能通过 HTTP 访问 Cookie
        secure: true, // 限制只能通过 HTTPS 访问 Cookie
        sameSite: 'strict', // 限制 Cookie 在跨站点请求时发送
      });
      res.json(mergeResTemplate({ data: '登录成功' }));
    }
    res.json(mergeResTemplate({ data: { token } }));
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post('verify')
  // @UseGuards(AuthGuard('jwt'))
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
