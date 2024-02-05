import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['Authorization']; // 假设 token 存储在请求头的 'authorization' 字段中
    return token;
  },
);
