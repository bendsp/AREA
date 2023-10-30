import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('send-random')
  async sendRandomPokemon(@Body() data: { email: string }) {
    try {
      await this.pokemonService.sendRandomPokemon(data.email);
      return { message: 'Random Pokemon email sent successfully!' };
    } catch (error) {
      throw new BadRequestException('Failed to send random Pokemon.');
    }
  }

  @Post('send-gen-random')
  async sendRandomPokemonFromGen(@Body() data: { gen: number; email: string }) {
    const { gen, email } = data;
    if (!gen || gen < 1) {
      throw new BadRequestException('Invalid generation provided.');
    }

    try {
      await this.pokemonService.sendRandomPokemonFromGen(gen, email);
      return {
        message: `Random Pokemon from generation ${gen} email sent successfully!`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to send random Pokemon from the provided generation.',
      );
    }
  }

  @Post('send-potion')
  async sendRandomPotionData(@Body() data: { email: string }) {
    try {
      await this.pokemonService.sendRandomItemData(data.email);
      return { message: 'Random Potion email sent successfully!' };
    } catch (error) {
      throw new BadRequestException('Failed to send random Potion.');
    }
  }
}
