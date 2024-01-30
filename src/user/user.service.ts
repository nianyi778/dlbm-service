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

  findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }

  async createUser(payload: {
    username: string;
    password: string;
  }): Promise<User> {
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
