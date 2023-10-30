import { Module } from '@nestjs/common';
import { CoingekoService } from './coingeko.service';
import { CoingekoController } from './coingeko.controller';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [MailingModule],
  controllers: [CoingekoController],
  providers: [CoingekoService],
  exports: [],
})
export class CoingekoModule {}
