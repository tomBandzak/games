import { Controller, Get } from '@nestjs/common';
import { CallService, weekDays } from './call.service';

@Controller('calls')
export class CallController {
  constructor(
    private readonly callService: CallService,
  ) {}

  @Get('/')
  async getCalls() {
    try {
      return await this.callService.getCallsOnWeekDay(weekDays.Monday);
    } catch (e) {
      throw Error(e);
    }
  }
}