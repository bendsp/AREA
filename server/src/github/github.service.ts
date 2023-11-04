import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UpdateData } from 'src/db/db.updateData';

@Injectable()
export class GithubService {
  async fetchNotifications(access_token: string): Promise<any | null> {
    const url = 'https://api.github.com/notifications';
    const headers = {
      Authorization: `token ${access_token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    try {
      const response = await axios.get(url, { headers: headers });

      if (response.status === 200) {
        return response.data;
      } else {
        // Handle non-200 status codes if needed
        throw new Error(`Received status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching notifications: ${error.message}`);
      return null;
    }
  }

  async exchangeCodeForToken(code: string, user_id: string): Promise<string> {
    const client_id = '469d3830933d3d81b6a9';
    const client_secret = 'd161eb0f427e0d6d4bd800748a1c8a839958e59e';
    const url = 'https://github.com/login/oauth/access_token';

    try {
      const response = await axios.post(
        url,
        {
          client_id: client_id,
          client_secret: client_secret,
          code: code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (response.data.error) {
        throw new Error(
          `Error from GitHub: ${response.data.error_description}`,
        );
      }
      await UpdateData(
        user_id,
        response.data.access_token,
        'User',
        'github_token',
      );
      return response.data.access_token;
    } catch (error) {
      throw new Error(`Error exchanging code for token: ${error.message}`);
    }
  }
}
