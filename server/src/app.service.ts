import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'What a strange game, the only winning move is not to play.';
  }
}
