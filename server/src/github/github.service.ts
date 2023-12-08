import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UpdateData } from 'src/db/db.updateData';
import { selectRow, selectRows } from 'src/db/db.selectData';

@Injectable()
export class GithubService {
  async fetchNotifications(): Promise<number[]> {
    const users = await selectRows('get_github_notifications');
    const FeedUpdates: number[] = [];

    for (const element of users) {
      const github_token = await selectRow(
        'User',
        'github_token',
        element.user_id,
      );

      if (!github_token) {
        continue;
      }

      // Get username using the github_token
      try {
        const userResponse = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${github_token}`,
          },
        });

        const username = userResponse.data.login;
        const url = `https://api.github.com/users/${username}/received_events`;

        const feedResponse = await axios.get(url, {
          headers: {
            Authorization: `token ${github_token}`,
          },
        });
        if (feedResponse.data && feedResponse.data.length > 0) {
          const latestFeedUpdate = feedResponse.data[0].created_at;
          const latestFeedUpdateDate = new Date(latestFeedUpdate);
          const currentDate = new Date();
          const oneMinuteAgo = new Date(currentDate.getTime() - 60000); // 60000ms = 1 minute

          // If the latest update is within the last minute, add the area_id to the FeedUpdates array
          if (latestFeedUpdateDate > oneMinuteAgo) {
            FeedUpdates.push(element.area_id); // assuming area_id is part of the element
          }
        }
      } catch (error) {
        console.error('Error fetching GitHub feed updates:', error);
      }
    }
    // console.log('FeedUpdates:', FeedUpdates);
    return FeedUpdates;
  }

  async exchangeCodeForToken(code: string, user_id: string): Promise<string> {
    const client_id = 'your_client_id';
    const client_secret = 'your_client_secret';
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
