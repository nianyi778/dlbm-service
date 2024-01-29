import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaobaoModule } from './taobao/taobao.module';
import { LoginModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaobaoModule, LoginModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 123
}
