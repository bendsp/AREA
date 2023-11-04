import { Injectable } from '@nestjs/common';
import { MailingService } from 'src/mailing/mailing.service';
import axios from 'axios';
import { Logger } from '@nestjs/common';

@Injectable()
export class ChuckService {
  constructor(private readonly mailingService: MailingService) {}

  async sendRandomDevJoke(email: string): Promise<void> {
    const options = {
      method: 'GET',
      url: 'https://api.chucknorris.io/jokes/random?category=dev',
    };

    try {
      const response = await axios.request(options);
      const randomJoke = response.data.value;

      Logger.log(randomJoke);

      await this.mailingService.sendMail({
        email: email,
        subject: 'Random Chuck Norris Dev Joke:',
        message: randomJoke,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendRandomReligionJoke(email: string): Promise<void> {
    const options = {
      method: 'GET',
      url: 'https://api.chucknorris.io/jokes/random?category=religion',
    };

    try {
      const response = await axios.request(options);
      const randomJoke = response.data.value;

      Logger.log(randomJoke);

      await this.mailingService.sendMail({
        email: email,
        subject: 'Random Chuck Norris Religion Joke:',
        message: randomJoke,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendRandomPoliticalJoke(email: string): Promise<void> {
    const options = {
      method: 'GET',
      url: 'https://api.chucknorris.io/jokes/random?category=political',
    };

    try {
      const response = await axios.request(options);
      const randomJoke = response.data.value;

      Logger.log(randomJoke);

      await this.mailingService.sendMail({
        email: email,
        subject: 'Random Chuck Norris Political Joke:',
        message: randomJoke,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
