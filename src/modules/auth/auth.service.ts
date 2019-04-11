import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(token: string): Promise<any> {
    return token === 'TOKEN';
  }
}