import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Call } from './entities/call.entity';
import { ICall } from './interfaces/call.interface';

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(Call)
    private readonly callRepository: Repository<Call>,
  ) {}

  async findAll(): Promise<Call[]> {
    return await this.callRepository.find();
  }

  async log(): Promise<ICall> {
    const callLog = this.callRepository.create();
    return this.callRepository.save(callLog);
  }
}