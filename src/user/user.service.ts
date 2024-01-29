import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async createUser(payload: {
    username: string;
    password: string;
  }): Promise<User> {
    const { username, password } = payload;
    const user = new User();
    user.username = username;
    user.password = password;
    user.name = username;

    return this.userRepository.save(user);
  }
}
