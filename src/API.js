/* eslint-disable linebreak-style */
import config from '../config.json';

export default {
  async search(query, page, pageSize) {
    const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=${page}&pageSize=${pageSize}&q=${query}&safeSearch=false`;
    const headers = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
        'x-rapidapi-key': config.API_KEY,
      },
    };

    const response = await fetch(url, headers);
    const result = await response.json();

    return result.value;
  },
};
