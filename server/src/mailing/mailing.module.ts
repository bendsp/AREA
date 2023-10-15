import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        template: {
            dir: process.cwd() + '/templates/',
            adapter: new HandlebarsAdapter(),
            options: {
            strict: true,
            },
        },
        }),
    ],
    providers: [MailingService, ConfigService],
    controllers: [MailingController],
    exports: [MailingService]
})
export class MailingModule {}
