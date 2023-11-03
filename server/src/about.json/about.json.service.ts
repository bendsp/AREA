import { Injectable } from '@nestjs/common';
import { Service } from './about.json.interfaces';

interface AboutJson {
  client: {
    host: string;
  };
  server: {
    current_time: number;
    services: Service[];
  };
}

@Injectable()
export class AboutJsonService {
  async getAboutJson(): Promise<AboutJson> {
    return {
      client: {
        host: 'http://localhost:8081',
      },
      server: {
        current_time: Date.now(),
        services: [
          {
            name: 'Time',
            actions: [
              {
                name: 'get_city_time',
                description: 'When time is reached in selected city',
                params: [
                  {
                    name: 'time',
                    type: 'string',
                  },
                  {
                    name: 'city',
                    type: 'string',
                  },
                ],
              },
            ],
            reactions: [],
          },
          {
            name: 'Gmail',
            actions: [],
            reactions: [
              {
                name: 'send_email',
                description:
                  'Send an email to the destination email address with subject and body',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                  {
                    name: 'subject',
                    type: 'string',
                  },
                  {
                    name: 'message',
                    type: 'string',
                  },
                ],
              },
            ],
          },
          {
            name: 'Pokemon',
            actions: [],
            reactions: [
              {
                name: 'send_random_pokemon',
                description:
                  'Send an email to the destination email address with a random pokemon',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'send_random_gen_pokemon',
                description:
                  'Send an email to the destination email address with a random pokemon from a specific generation',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                  {
                    name: 'generation',
                    type: 'number',
                  },
                ],
              },
              {
                name: 'send_random_item',
                description:
                  'Send an email to the destination email address with a random potion',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
            ],
          },
          {
            name: 'NBA',
            actions: [],
            reactions: [
              {
                name: 'send_random_nba_player',
                description:
                  'Send an email to the destination email address with a random NBA player',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'send_random_nba_team',
                description:
                  'Send an email to the destination email address with a random NBA team',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'send_random_nba_game',
                description:
                  'Send an email to the destination email address with a random NBA game',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
            ],
          },
          {
            name: 'Coingeko',
            actions: [],
            reactions: [
              {
                name: 'send_random_token',
                description:
                  'Send an email to the destination email address with a random token',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
            ],
          },
          {
            name: 'Chuck Norris',
            actions: [],
            reactions: [
              {
                name: 'send_random_chuck_norris_dev_joke',
                description:
                  'Send an email to the destination email address with a random Chuck Norris dev joke',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'send_random_chuck_norris_religion_joke',
                description:
                  'Send an email to the destination email address with a random Chuck Norris religion joke',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'send_random_chuck_norris_political_joke',
                description:
                  'Send an email to the destination email address with a random Chuck Norris political joke',
                params: [
                  {
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  }
}
