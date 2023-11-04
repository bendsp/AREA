import { Controller, Get, Body } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('callback')
  async handleGithubCallback(@Body() code: { user_id: string; code: string }) {
    if (!code) {
      throw new Error('No code provided by GitHub');
    }
    const accessToken = await this.githubService.exchangeCodeForToken(
      code.user_id,
      code.code,
    );
    return { access_token: accessToken };
  }
}
