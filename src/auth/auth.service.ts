import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    // 123
  }

  generateToken(payload: { username: string }): string {
    return this.jwtService.sign(payload);
  }

  async validateUser(username: string) {
    return this.userService.findOne(username);
  }

  validateToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
