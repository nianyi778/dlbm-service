import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  ConflictException,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserService } from './user.service';
import { Response } from 'express';
import { Promise } from 'mongoose';
@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: AuthService,
  ) {
    //
  }

  @Post('login')
  async login(
    @Body() credentials: { username: string; password: string },
    @Res() res: Response,
  ): Promise<void> {
    // 执行身份验证逻辑...
    const { username, password } = credentials;
    const cur = await this.userService.findOne(username);
    if (cur) {
      throw new ConflictException('用户名已存在');
    }
    // 如果验证成功，生成令牌
    const result = await this.userService.createUser({ username, password });

    if (!result) {
      throw new ConflictException('服务异常，请重试！');
    }
    const token = this.jwtService.generateToken({ username });

    res.cookie('Authorization', token, {
      maxAge: 3600000,
      httpOnly: true,
    });

    throw new HttpException('登录成功', HttpStatus.OK);
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const users = await this.userService.findAll();
    return users;
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
