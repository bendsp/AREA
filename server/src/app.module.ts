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
import { CheckTriggersModule } from './check-triggers/check-triggers.module';
import { NbaController } from './nba/nba.controller';
import { NbaService } from './nba/nba.service';
import { NbaModule } from './nba/nba.module';
import { CoingekoController } from './coingeko/coingeko.controller';
import { CoingekoService } from './coingeko/coingeko.service';
import { CoingekoModule } from './coingeko/coingeko.module';

@Module({
  imports: [
    MailingModule,
    CheckTriggersModule,
    ClientModule,
    TimeModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NbaModule,
    CoingekoModule,
  ],
  controllers: [
    AppController,
    AboutJsonController,
    NbaController,
    CoingekoController,
  ],
  providers: [AppService, AboutJsonService, NbaService, CoingekoService],
})
export class AppModule {}
