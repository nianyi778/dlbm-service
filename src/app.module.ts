import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaobaoModule } from './taobao/taobao.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigProvider } from './constants/mongoose-config.provider';
import { PracticeInterceptor } from './common/interceptor/practice.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptor/response.Interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_URL: Joi.string().required(),
        DB_URI: Joi.string().required(),
        DB_DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_SIGNOPTIONS_EXPIRESIN: Joi.string().default('1h'),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongooseConfigProvider = new MongooseConfigProvider(
          configService,
        );
        const mongooseOptions = mongooseConfigProvider.getMongooseOptions();
        return mongooseOptions;
      },
      inject: [ConfigService],
    }),
    TaobaoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PracticeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  // 123
}
