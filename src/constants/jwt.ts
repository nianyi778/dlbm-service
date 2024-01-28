import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: '41d85d70737938ed01a4982832cc76d5e5dbef31cdd3e6f6724d4047f11ae004',
  signOptions: { expiresIn: '1h' },
};
