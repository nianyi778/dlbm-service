import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigProvider {
  constructor(private readonly configService: ConfigService) {
    // 12
  }

  getMongooseOptions(): MongooseModuleOptions {
    const mongodbUri = this.configService.get<string>('DB_URI');
    const dbName = this.configService.get<string>('DB_DB_NAME');
    const username = this.configService.get<string>('DB_USER');
    const password = this.configService.get<string>('DB_PASS');

    return {
      uri: mongodbUri,
      dbName: dbName,
      user: username,
      pass: password,
      retryWrites: true,
      w: 'majority',
    };
  }
}
