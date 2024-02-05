import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientType = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const clientType = request.headers['x-client-type'];
    if (clientType && Object.values(ClientTypeEnum).includes(clientType)) {
      return clientType;
    }
    return ClientTypeEnum.OTHER;
  },
);

export enum ClientTypeEnum {
  'WEB' = 'web',
  'ANDROID' = 'android',
  'IOS' = 'ios',
  'OTHER' = 'other',
}
