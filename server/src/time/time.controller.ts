// src/time/time.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get('api/:city')
  async getCurrentTime(@Param('city') city: string): Promise<string> {
    return await this.timeService.getCurrentTimeByCity(city);
  }
}
