import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    //
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(username: string, password?: string): Promise<User> {
    const query = { username } as {
      username: string;
      password?: string;
    };
    if (password) {
      query.password = password;
    }
    return this.userModel.findOne(query);
  }

  createUser(payload: { username: string; password: string }): Promise<User> {
    const { username, password } = payload;
    const user = {
      username: username,
      password: password,
      name: `${username}`,
    };

    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
