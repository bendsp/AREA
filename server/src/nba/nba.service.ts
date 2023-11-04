import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { MailingService } from 'src/mailing/mailing.service';
import { Status } from './../main';

@Injectable()
export class NbaService {
  private readonly logger = new Logger(NbaService.name);

  constructor(private readonly mailingService: MailingService) {}

  async sendRandomNbaPlayer(email: string): Promise<Status> {
    const options = {
      method: 'GET',
      url: 'https://free-nba.p.rapidapi.com/players',
      params: { page: '0', per_page: '25' },
      headers: {
        'X-RapidAPI-Key': '637441d71bmsh199b1a10ed5da23p16c851jsn8ed14898ed82',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const randomIndex = Math.floor(Math.random() * response.data.data.length);
      const randomPlayer =
        response.data.data[randomIndex].first_name +
        ' ' +
        response.data.data[randomIndex].last_name;
      const teamplayer = response.data.data[randomIndex].team.full_name;
      Logger.log(randomPlayer);
      this.mailingService.sendMail({
        email: email,
        subject: 'Random NBA Player',
        message:
          'Here is your random player: ' + randomPlayer + ' from ' + teamplayer,
      });
      return {
        statusCode: 200,
        message: 'Email with random NBA player sent successfully!',
      };
    } catch (error) {
      this.logger.error('Error sending random NBA player:', error);
      return { statusCode: 500, message: 'Failed to send random NBA player.' };
    }
  }

  async sendRandomNbaTeam(email: string): Promise<Status> {
    const options = {
      method: 'GET',
      url: 'https://free-nba.p.rapidapi.com/teams',
      params: { page: '0', per_page: '25' },
      headers: {
        'X-RapidAPI-Key': '637441d71bmsh199b1a10ed5da23p16c851jsn8ed14898ed82',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const randomIndex = Math.floor(Math.random() * response.data.data.length);
      const randomTeam =
        'Here is your random team: ' +
        response.data.data[randomIndex].full_name +
        ' from ' +
        response.data.data[randomIndex].city;

      this.mailingService.sendMail({
        email: email,
        subject: 'Random NBA Team',
        message: randomTeam,
      });
      return {
        statusCode: 200,
        message: 'Email with random NBA team sent successfully!',
      };
    } catch (error) {
      this.logger.error('Error sending random NBA team:', error);
      return { statusCode: 500, message: 'Failed to send random NBA team.' };
    }
  }

  async sendRandomNbaGame(email: string): Promise<Status> {
    const res = (Math.random() * 50).toString();
    const options = {
      method: 'GET',
      url: 'https://free-nba.p.rapidapi.com/games',
      params: { page: res, per_page: '100' },
      headers: {
        'X-RapidAPI-Key': '637441d71bmsh199b1a10ed5da23p16c851jsn8ed14898ed82',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const randomIndex = Math.floor(Math.random() * response.data.data.length);
      const game = response.data.data[randomIndex];
      const randomGame = `Here is your random game:
${game.home_team.full_name} vs ${game.visitor_team.full_name}
Score: ${game.home_team_score} - ${game.visitor_team_score}
Season: ${game.season}
Period: ${game.period}
Date: ${game.date}`;

      this.mailingService.sendMail({
        email: email,
        subject: 'Random NBA Game',
        message: randomGame,
      });
      return {
        statusCode: 200,
        message: 'Email with random NBA game sent successfully!',
      };
    } catch (error) {
      this.logger.error('Error sending random NBA game:', error);
      return { statusCode: 500, message: 'Failed to send random NBA game.' };
    }
  }
}
