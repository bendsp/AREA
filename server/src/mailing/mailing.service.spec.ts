import { Test, TestingModule } from '@nestjs/testing';
import { MailingService } from './mailing.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Status } from 'src/main';
import { Credentials } from 'google-auth-library';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

describe('MailingService', () => {
  let mailingService: MailingService;
  let configService: ConfigService;
  let mailerService: MailerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailingService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
            addTransporter: jest.fn(),
          },
        },
      ],
    }).compile();

    mailingService = module.get<MailingService>(MailingService);
    configService = module.get<ConfigService>(ConfigService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(mailingService).toBeDefined();
  });

  describe('sendMail', () => {
    it('should send an email and return success status', async () => {
      const mailData = {
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message',
      };

      // Mock the sendMail method to return a success response
      const sendMailMock = jest
        .spyOn(mailerService, 'sendMail')
        .mockResolvedValue(true);

      const result: Status = await mailingService.sendMail(mailData);

      // Verify that the sendMail method was called with the correct parameters
      expect(sendMailMock).toHaveBeenCalledWith({
        transporterName: 'gmail',
        to: mailData.email,
        subject: mailData.subject,
        template: 'action',
        context: {
          message: mailData.message,
        },
      });

      // Verify that the result is as expected
      expect(result).toEqual({ statusCode: 200, message: 'email send well' });
    });

    it('should handle email sending failure and return an error status', async () => {
      const mailData = {
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message',
      };

      // Mock the sendMail method to throw an error
      const sendMailMock = jest
        .spyOn(mailerService, 'sendMail')
        .mockRejectedValue(new Error('Email sending failed'));

      const result: Status = await mailingService.sendMail(mailData);

      // Verify that the sendMail method was called with the correct parameters
      expect(sendMailMock).toHaveBeenCalledWith({
        transporterName: 'gmail',
        to: mailData.email,
        subject: mailData.subject,
        template: 'action',
        context: {
          message: mailData.message,
        },
      });

      // Verify that the result is as expected
      expect(result).toEqual({ statusCode: 500, message: 'email not send well' });
    });
  });

  describe('setTransport', () => {
    it('should set the Gmail transporter with OAuth2', async () => {
      // Mock the OAuth2 constructor
      // Mock the OAuth2 constructor

      // const OAuth2Mock = jest.spyOn(google.auth, 'OAuth2').mockReturnValue({
      //   setCredentials: jest.fn(),
      //   getAccessToken: async (): Promise<{ token: string }> => ({ token: 'mock-access-token' }),
      // } as unknown as OAuth2Client);

      // Mock the addTransporter method
      const addTransporterMock = jest.spyOn(mailerService, 'addTransporter');

      // Mock the ConfigService to provide required configuration values
      configService.get = jest
        .fn()
        .mockReturnValueOnce('mock-client-id')
        .mockReturnValueOnce('mock-client-secret')
        .mockReturnValueOnce('mock-email');

      await mailingService['setTransport']();


      // Verify that the addTransporter method was called with the correct configuration
      expect(addTransporterMock).toHaveBeenCalledWith('gmail', {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'mock-email',
          clientId: 'mock-client-id',
          clientSecret: 'mock-client-secret',
          accessToken: 'mock-access-token',
          refreshToken: expect.any(String),
          accessUrl: 'https://oauth2.googleapis.com/token',
          expires: expect.any(Number),
        },
      });


      // Verify that the addTransporter method was called with the correct configuration
      expect(addTransporterMock).toHaveBeenCalledWith('gmail', {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'mock-email',
          clientId: 'mock-client-id',
          clientSecret: 'mock-client-secret',
          accessToken: 'mock-access-token',
        },
      });
    });
  });
});