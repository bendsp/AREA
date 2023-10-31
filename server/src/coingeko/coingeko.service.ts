import { Injectable } from '@nestjs/common';

@Injectable()
export class CoingekoService {
  async sendRandomToken() {
    const axios = require('axios');
    const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/list',
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
