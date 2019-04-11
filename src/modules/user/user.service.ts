import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async getOneByToken(token: string): Promise<IUser | null> {
      return await this.userRepository.findOne({ token });
  }
}