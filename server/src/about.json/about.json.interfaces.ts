export interface Service {
  name: string;
  actions: Action[];
  reactions: Reaction[];
}

export interface Param {
  name: string;
  type: 'string' | 'number' | 'boolean';
}

export interface Action {
  name: 'get_city_time';
  description: string;
  params: Param[];
}

export interface Reaction {
  name:
    | 'send_email'
    | 'send_random_pokemon'
    | 'send_random_gen_pokemon'
    | 'send_random_item'
    | 'send_random_nba_player'
    | 'send_random_nba_team'
    | 'send_random_nba_game';
  description: string;
  params: Param[];
}
