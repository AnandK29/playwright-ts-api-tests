
export class AuthHelper {
  readonly username_swapi: string
  readonly password_swapi: string

  constructor() {
    const password = process.env.password;
    const username = process.env.username;
    if ( !username || !password) {
      throw new Error("Required API env variables are not set to generate oauth token.");
    }
    this.username_swapi = username;
    this.password_swapi = password;
  }

  async generateBasicOauthToken(): Promise<string> {
    const creds = `${this.username_swapi}:${this.password_swapi}`;
    const encodedCreds = Buffer.from(creds).toString('base64');
    return `Basic ${encodedCreds}`
  }
}