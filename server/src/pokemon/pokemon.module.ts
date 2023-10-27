import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [PokemonService]
})
export class PokemonModule {}
