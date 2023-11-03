import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { MailingService } from 'src/mailing/mailing.service';
import { Status } from 'src/main';
@Injectable()
export class CoingekoService {
  constructor(private readonly mailingService: MailingService) {}

  async sendRandomToken(email: string): Promise<Status> {
    const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/list',
    };

    try {
      const response = await axios.request(options);
      const randomToken =
        response.data[Math.floor(Math.random() * response.data.length)];

      Logger.log(randomToken.symbol);
      Logger.log(randomToken.name);

      const result =
        'The token is: ' +
        randomToken.symbol +
        ' and the name is: ' +
        randomToken.name;

      await this.mailingService.sendMail({
        email: email,
        subject: 'Random Token:',
        message: result,
      });
      return { statusCode: 200, message: 'Token send well' };
    } catch (error) {
      console.error(error);
    }
  }
}
