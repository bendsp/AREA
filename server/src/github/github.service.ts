import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UpdateData } from 'src/db/db.updateData';
import { selectRow, selectRows } from 'src/db/db.selectData';

@Injectable()
export class GithubService {
  async fetchNotifications(): Promise<number[]> {
    const user = await selectRows('get_github_notifications');
    let TriggerID: number[];
    user.forEach(async (element) => {
      const github_token = selectRow('User', element.user_id, 'github_token');
      if (!github_token) {
        return;
      }
      const url = `https://api.github.com/notifications?access_token=${github_token}`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.length > 0) {
        TriggerID.push(element.area_id);
      }
    });
    return TriggerID;
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
