import { Body, Controller, Get , Post} from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Mailing } from './mailing.interface';
import { MailData } from './mailing.interface';
import { User } from '../interfaces/user';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}

  @Post('api/send-mail')
  public async sendMail(@Body() body: MailData): Promise<Mailing> {    
    return await this.mailingService.sendMail(body);
  }
  
  @Post('send-data-mail')
  public async sendDataMail(@Body() body: User): Promise<Mailing> {    
    return await this.mailingService.sendDataMail(body);
  }

}