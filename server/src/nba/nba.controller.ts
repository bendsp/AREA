import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NbaService } from './nba.service';

@Controller('nba')
export class NbaController {
  constructor(private readonly nbaService: NbaService) {}

  @Post('send-random-player')
  async sendRandomNbaPlayer(@Body() data: { email: string }) {
    const { email } = data;
    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    try {
      const result = await this.nbaService.sendRandomNbaPlayer(email);
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to send random NBA player.');
    }
  }

  @Post('send-random-team')
  async sendRandomNbaTeam(@Body() data: { email: string }) {
    const { email } = data;
    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    try {
      const result = await this.nbaService.sendRandomNbaTeam(email);
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to send random NBA team.');
    }
  }

  @Post('send-random-game')
  async sendRandomNbaGame(@Body() data: { email: string }) {
    const { email } = data;
    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    try {
      const result = await this.nbaService.sendRandomNbaGame(email);
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to send random NBA game.');
    }
  }
}
