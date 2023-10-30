import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { MailingService } from 'src/mailing/mailing.service';
import { Status } from './../main';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);

  constructor(private readonly mailingService: MailingService) {}

  public async sendRandomPokemon(email: string): Promise<Status> {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=1',
      );
      const randomPokemon =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ].name;
      const pokemonResponseData = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/' + randomPokemon,
      );

      let message =
        'Here is your random pokemon and there stat: ' + randomPokemon + ', ';
      for (const stat of pokemonResponseData.data.stats) {
        message += stat.stat.name + ': ' + stat.base_stat + ',\n';
      }

      await this.mailingService.sendMail({
        email: email,
        subject: 'Random Pokemon:',
        message: message,
      });
      return {
        statusCode: 200,
        message: 'Email with random Pokemon details sent successfully!',
      };
    } catch (error) {
      this.logger.error('Error sending random Pokemon:', error);
      return {
        statusCode: 500,
        message: 'Failed to send random Pokemon details.',
      };
    }
  }

  public async sendRandomPokemonFromGen(
    gen: number,
    email: string,
  ): Promise<Status> {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/generation/' + gen,
      );
      const randomPokemon =
        response.data.pokemon_species[
          Math.floor(Math.random() * response.data.pokemon_species.length)
        ].name;
      const pokemonResponseData = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/' + randomPokemon,
      );

      let message =
        'Here is your random pokemon from generation ' +
        gen +
        ': ' +
        randomPokemon +
        '\nStat:\n';
      for (const stat of pokemonResponseData.data.stats) {
        message += stat.stat.name + ': ' + stat.base_stat + '\n';
      }

      await this.mailingService.sendMail({
        email: email,
        subject: 'Random Pokemon from gen ' + gen,
        message: message,
      });
      return {
        statusCode: 200,
        message:
          'Email with random Pokemon from generation ' +
          gen +
          ' sent successfully!',
      };
    } catch (error) {
      this.logger.error(
        'Error sending random Pokemon from generation ' + gen + ':',
        error,
      );
      return {
        statusCode: 500,
        message:
          'Failed to send random Pokemon details from generation ' + gen + '.',
      };
    }
  }

  public async sendRandomItemData(email: string): Promise<Status> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/item');
      const randomPokemon = Math.floor(
        Math.random() * response.data.results.length,
      );
      const randomPotion = response.data.results[randomPokemon].name;

      let message = randomPotion + ': ';
      const potionResponseData = await axios.get(
        'https://pokeapi.co/api/v2/item/' + randomPotion,
      );
      message +=
        'It is a ' +
        potionResponseData.data.category.name +
        ', and the effect is ';
      message += potionResponseData.data.effect_entries[0].effect;

      await this.mailingService.sendMail({
        email: email,
        subject: 'Random Item Pokemon',
        message: message,
      });

      return {
        statusCode: 200,
        message: 'Email with random potion details sent successfully!',
      };
    } catch (error) {
      this.logger.error('Error sending random potion details:', error);
      return {
        statusCode: 500,
        message: 'Failed to send random potion details.',
      };
    }
  }
}
