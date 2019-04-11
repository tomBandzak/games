import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CallService, weekDays } from './call.service';

@Controller('calls')
export class CallController {
  constructor(
    private readonly callService: CallService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('bearer'))
  async getCalls() {
    try {
      return await this.callService.getCallsOnWeekDay(weekDays.Monday);
    } catch (e) {
      throw Error(e);
    }
  }
}