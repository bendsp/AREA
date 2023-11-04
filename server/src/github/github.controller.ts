import { Controller, Post, Body, Logger } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post('callback')
  async handleGithubCallback(@Body() code: { user_id: string; code: string }) {
    if (!code) {
      throw new Error('No code provided by GitHub');
    }
    const accessToken = await this.githubService.exchangeCodeForToken(
      code.code,
      code.user_id,
    );
    return { access_token: accessToken };
  }
}
