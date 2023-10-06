// src/time/time.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TimeService } from './time.service';
import  { TimeData } from './time.interface';
import { Status } from 'src/main';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get('api/:city')
  async getCurrentTime(@Param('city') city: string): Promise<string> {
    return await this.timeService.getCurrentTimeByCity(city);
  }

  @Post('send-data')
  public async sendData(@Body() body: any): Promise<Status> {
    let data: TimeData = {city: body.city, time: body.time};
    return await this.timeService.sendData(body, body.id);
  }
}