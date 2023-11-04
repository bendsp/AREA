import { Controller, Post, Body, Logger } from '@nestjs/common';
import { CoingekoService } from './coingeko.service';
import { Status } from 'src/main';

@Controller('coingeko')
export class CoingekoController {
  constructor(private readonly coingekoService: CoingekoService) {}

  @Post('send-random-token')
  async sendRandomToken(@Body() email: { email: string }): Promise<Status> {
    Logger.log(email);
    return this.coingekoService.sendRandomToken(email.email);
  }
}
