import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { MailingService } from 'src/mailing/mailing.service';
import { PokemonData } from './pokemon.interface';

@Injectable()
export class PokemonService {

    constructor(private readonly mailingService: MailingService) {}

    public async sendRandomPokemon(PokemonData: PokemonData) {
        const randomPokemon = await this.getRandomPokemon();
        Logger.log(randomPokemon)
        this.mailingService.sendMail({email: PokemonData.email, subject: "Random Pokemon", message: "Here is your random pokemon: " })
    }

    async getRandomPokemon() {
        try {
            // Fetch the list of Pokémon
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=1');
            const { results } = response.data;

            // Generate a random index to select a Pokémon from the list
            const randomIndex = Math.floor(Math.random() * results.length);

            // Get the details of the randomly selected Pokémon
            const randomPokemonUrl = results[randomIndex].url;
            const pokemonResponse = await axios.get(randomPokemonUrl);
            const randomPokemon = pokemonResponse.data;

            return randomPokemon;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

}
