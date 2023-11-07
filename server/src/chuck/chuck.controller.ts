import { Controller, Post, Body } from '@nestjs/common';
import { ChuckService } from './chuck.service';

@Controller('chuck')
export class ChuckController {
  constructor(private readonly chuckService: ChuckService) {}

  @Post('send-dev-joke')
  async sendRandomDevJoke(@Body() email: { email: string }): Promise<void> {
    await this.chuckService.sendRandomDevJoke(email.email);
  }

  @Post('send-religion-joke')
  async sendRandomReligionJoke(
    @Body() email: { email: string },
  ): Promise<void> {
    await this.chuckService.sendRandomReligionJoke(email.email);
  }

  @Post('send-political-joke')
  async sendRandomPoliticalJoke(
    @Body() email: { email: string },
  ): Promise<void> {
    await this.chuckService.sendRandomPoliticalJoke(email.email);
  }
}
