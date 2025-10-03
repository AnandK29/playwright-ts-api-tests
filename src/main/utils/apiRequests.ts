import { APIRequestContext } from '@playwright/test';
import { AuthHelper } from '../utils/authHelper';
import { endpoints } from '../test-urls/testUrls';

export class ApiRequests {
  readonly baseUrl: string

  constructor(public readonly request: APIRequestContext) {
      this.request = request;   
      this.baseUrl = endpoints.baseUrl ?? 'null';
  }

  private async generateAuthToken(): Promise<string>{
    let authHelper = new AuthHelper();
    return await authHelper.generateBasicOauthToken();
  }

  async createApiEndPoint(path: string): Promise<string> {
    return endpoints.baseUrl + path;
  }

  async postApiRequest(apiname: string, payload: Object, customHeaders: any) {
    let authToken = await this.generateAuthToken();
    customHeaders['Authorization'] = authToken;

    let response  = await this.request.post(await this.createApiEndPoint(apiname), {
      headers: customHeaders,
      data: payload
   });

   return response;
  }

  async getApiRequest(apiname: string, customHeaders: any) {
    //let authToken = await this.generateAuthToken();
    //customHeaders['Authorization'] = authToken;

    let response = await this.request.get(await this.createApiEndPoint(apiname), {
      "headers": customHeaders,
    });

    return response;
  }

}