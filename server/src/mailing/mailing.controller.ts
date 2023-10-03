import { Controller, Get } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Mailing } from '../interfaces/mailing';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
  @Get('send-mail')
  public async sendMail(): Promise<Mailing> {
    return await this.mailingService.sendMail();
  }
}