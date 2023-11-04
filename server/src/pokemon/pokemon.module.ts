import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MailingModule } from 'src/mailing/mailing.module';
@Module({
  imports: [MailingModule],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
