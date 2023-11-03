import { Module } from '@nestjs/common';
import { CheckTriggersService } from './check-triggers.service';
import { CheckTriggersController } from './check-triggers.controller';
import { MailingModule } from '../mailing/mailing.module';
import { TimeModule } from '../time/time.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { NbaModule } from 'src/nba/nba.module';
import { ChuckModule } from 'src/chuck/chuck.module';
import { CoingekoModule } from 'src/coingeko/coingeko.module';
@Module({
  imports: [
    MailingModule,
    TimeModule,
    PokemonModule,
    NbaModule,
    ChuckModule,
    CoingekoModule,
  ],
  controllers: [CheckTriggersController],
  providers: [CheckTriggersService],
})
export class CheckTriggersModule {}
