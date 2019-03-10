import {Project} from "../models/Project";

export class CircleCIService {
  baseUrl: string = 'https://circleci.com/api/v1.1';
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  projects(): Promise<Project[]> {
    const url = `${this.baseUrl}/projects?circle-token=${this.apiKey}`;
    return fetch(url)
    .then(response => {
      return response.json();
    });
  }

}
