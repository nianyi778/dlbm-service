import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          data,
          success: true,
          code: 200,
        };

        // 获取当前请求的上下文
        const ctx = context.switchToHttp();

        // 获取当前请求的响应对象
        const responseObj = ctx.getResponse();

        // 获取当前请求的响应状态码
        const statusCode = responseObj.statusCode;

        // 如果响应状态码不是 200，则将 success 设置为 false
        if (statusCode !== 200) {
          response.success = false;
        }

        // 如果响应状态码是 400 或 404，则将 code 设置为 400 或 404
        if (statusCode === 400 || statusCode === 404) {
          response.code = statusCode;
        }

        return response;
      }),
    );
  }
}
