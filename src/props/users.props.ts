export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    name?: string;
    company?: string;
    followers: number;
    following: number;
  }
  