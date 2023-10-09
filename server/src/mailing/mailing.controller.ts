import { Body, Controller, Get , Post} from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailData } from './mailing.interface';
import { Status } from 'src/main';


@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}

  @Post('api/send-mail')
  public async sendMail(@Body() body: MailData): Promise<Status> {    
    return await this.mailingService.sendMail(body);
  }

}