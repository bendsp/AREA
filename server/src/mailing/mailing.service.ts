import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

interface Mailing {
    success: boolean;
    message: string;
}

@Injectable()
export class MailingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  public async sendMail(): Promise<Mailing>{
    try {
        await this.setTransport();
        const success = await this.mailerService.sendMail({
          transporterName: 'gmail',
          to: 'kentinpaille@gmail.com',
          from: 'nathanpaillet@gmail.com',
          subject: 'Verification Code',
          template: 'action',
          context: {
            code: '123456',
          },
        });
        console.log(success);
        return { success: true, message: 'Email sent' };
      } catch (err) {
        console.error(err);
        return { success: false, message: 'Email not sent' };
      }
  }

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }
}