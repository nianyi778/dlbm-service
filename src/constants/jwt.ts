import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', (): JwtModuleOptions => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_SIGNOPTIONS_EXPIRESIN },
  };
});
