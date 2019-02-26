class CircleCIService {
  baseUrl = 'https://circleci.com/api/v1.1';
  apiKey = null;

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  projects() {
    const url = `${this.baseUrl}/projects?circle-token=${this.apiKey}`;
    return fetch(url)
      .then(response => {
        return response.json();
      });
  }

}

export {
  CircleCIService
};