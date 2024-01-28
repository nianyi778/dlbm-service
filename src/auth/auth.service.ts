import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
    // 123
  }

  generateToken(payload: { userId: number }): string {
    return this.jwtService.sign(payload);
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
