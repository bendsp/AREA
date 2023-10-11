import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutJsonService } from './about.json/about.json.service';
import { AboutJsonController } from './about.json/about.json.controller';
import { MailingModule } from './mailing/mailing.module';
import { TimeModule } from './time/time.module';
import { ClientModule } from './client/client.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckTrigersModule } from './check-trigers/check-trigers.module';

@Module({
    imports: [
        MailingModule,
        CheckTrigersModule,
        ClientModule,
        TimeModule,
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController, AboutJsonController],
    providers: [AppService, AboutJsonService],
})
export class AppModule {}
