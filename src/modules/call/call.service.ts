import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Call } from './entities/call.entity';
import { ICall } from './interfaces/call.interface';

export enum weekDays {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(Call)
    private readonly callRepository: Repository<Call>,
  ) {}

  async findAll(): Promise<Call[]> {
    return await this.callRepository.find();
  }

  async log() {
    const callLog = this.callRepository.create();
    return this.callRepository.save(callLog);
  }

  async getCallsOnWeekDay(day: number): Promise<ICall[]> {
    const calls = await this.findAll();
    return calls.filter(c => {
      return c.called_at.getDay() === day;
    });
  }
}