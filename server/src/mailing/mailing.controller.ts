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
  
  @Post('send-data-mail')
  public async sendDataMail(@Body() body: any): Promise<Status> {
    let data: MailData = {email: body.email, subject: body.subject, message: body.message};
    return await this.mailingService.sendDataMail(data, body.id);
  }

}