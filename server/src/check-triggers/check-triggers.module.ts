import { Module } from '@nestjs/common';
import { CheckTriggersService } from './check-triggers.service';
import { CheckTriggersController } from './check-triggers.controller';
import { MailingModule } from '../mailing/mailing.module';
import { TimeModule } from '../time/time.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { NbaModule } from 'src/nba/nba.module';
@Module({
  imports: [MailingModule, TimeModule, PokemonModule, NbaModule],
  controllers: [CheckTriggersController],
  providers: [CheckTriggersService],
})
export class CheckTriggersModule {}
