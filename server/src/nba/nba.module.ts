import { Module } from '@nestjs/common';
import { NbaService } from './nba.service';
import { NbaController } from './nba.controller';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [MailingModule],
  controllers: [NbaController],
  providers: [NbaService],
  exports: [NbaService],
})
export class NbaModule {}
