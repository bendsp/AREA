// src/time/time.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TimeService } from './time.service';
import  { TimeData } from './time.interface';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get(':city')
  async getCurrentTime(@Param('city') city: string): Promise<string> {
    return await this.timeService.getCurrentTimeByCity(city);
  }

  @Post('send-data')
  public async sendData(@Body() body: TimeData): Promise<string> {
    return await this.timeService.sendData(body);
  }
}