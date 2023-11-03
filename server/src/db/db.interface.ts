import { SelectTimeData, TimeData } from '../time/time.interface';
import { SelectEmailData, MailData } from '../mailing/mailing.interface';
import { PokemonData, PokemonGenData } from 'src/pokemon/pokemon.interface';

export type TableNames =
  | 'send_email'
  | 'get_city_time'
  | 'User'
  | 'Area'
  | 'send_random_pokemon'
  | 'send_random_gen_pokemon'
  | 'send_random_item'
  | 'send_random_nba_player'
  | 'send_random_nba_team'
  | 'send_random_nba_game'
  | 'send_random_token'
  | 'send_random_chuck_norris_dev_joke'
  | 'send_random_chuck_norris_religion_joke'
  | 'send_random_chuck_norris_political_joke';

export type serviceName = 'Gmail' | 'Time';

export interface GmailTable {
  TablesName: 'send_email';
  value: SelectEmailData;
}

export interface SendRandomPokemonTable {
  TablesName: 'send_random_pokemon';
  value: SelectPokemonData;
}

export interface TimeTable {
  TablesName: 'get_city_time';
  value: SelectTimeData;
}

export interface UserTable {
  TablesName: 'User';
  value: User;
}

export interface AreaTable {
  TablesName: 'Area';
  value: SelectAreaData;
}

export interface SelectPokemonData {
  TablesName: 'send_random_pokemon';
  value: PokemonData;
}

export interface SelectPokemonGenData {
  TablesName: 'send_random_gen_pokemon';
  value: PokemonGenData;
}

export interface SelectPokemonItemData {
  TablesName: 'send_random_item';
  value: PokemonData;
}

export interface SelectNbaPlayerData {
  TablesName: 'send_random_nba_player';
  value: PokemonData;
}

export interface SelectNbaTeamData {
  TablesName: 'send_random_nba_team';
  value: PokemonData;
}

export interface SelectNbaGameData {
  TablesName: 'send_random_nba_game';
  value: PokemonData;
}

export interface SelectTokenData {
  TablesName: 'send_random_token';
  value: PokemonData;
}

export interface SelectChuckNorrisDevJokeData {
  TablesName: 'send_random_chuck_norris_dev_joke';
  value: PokemonData;
}

export interface SelectChuckNorrisReligionJokeData {
  TablesName: 'send_random_chuck_norris_religion_joke';
  value: PokemonData;
}

export interface SelectChuckNorrisPoliticalJokeData {
  TablesName: 'send_random_chuck_norris_political_joke';
  value: PokemonData;
}

export interface PutData {
  user_id: string;
  area_id: number;
  TablesName: TableNames | string | '';
  value: MailData | TimeData | User | Area | object;
}

// export type PutData = {user_id: string; area_id: number;} & (GmailTable | TimeTable | UserTable | AreaTable | {TablesName: ""; value: {}});

export type Tables =
  | GmailTable
  | TimeTable
  | UserTable
  | AreaTable
  | SelectPokemonData
  | SelectPokemonGenData
  | SelectPokemonItemData
  | SelectNbaPlayerData
  | SelectNbaTeamData
  | SelectNbaGameData
  | SelectTokenData
  | SelectChuckNorrisDevJokeData
  | SelectChuckNorrisReligionJokeData
  | SelectChuckNorrisPoliticalJokeData;

export interface Area {
  area_name: string;
  nb_reaction: number;
}

export interface SelectAreaData {
  user_id: string;
  area_id: number;
  area_name: string;
  nb_reaction: number;
}

export interface User {
  user_id: string;
  email: string;
  username: string;
  nb_area: number;
}
