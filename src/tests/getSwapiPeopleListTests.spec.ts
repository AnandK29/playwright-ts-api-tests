import {test, expect} from '@playwright/test';
import {ApiRequests } from '../main/utils/apiRequests';
import { endpoints } from '../main/test-urls/testUrls';

test('fetch the people\'s list from swapi db', async ({ request }) => {
  let apiRequests = new ApiRequests(request);

  await test.step('call get people api', async () => {
    let requestHeaders = {'x-test-systems': 'swapi-qa'};

    let response = await apiRequests.getApiRequest(endpoints.addPeople, requestHeaders);
    
    // valiate response code & read reponse headers & body.
    expect(response.status()).toBe(200);
    let responseHeaders = await response.headers();
    let responseBody = await response.json();
    console.log(responseBody);
    
    // response header validations
    expect(responseHeaders['server']).toContain('nginx');

    // respose body validatons
    expect(responseBody.count).not.toBeNaN();
    let count = await responseBody.count;
    expect(count).toBe(82);
    expect(responseBody.next).toContain('/people/?page=');
    expect(responseBody).toHaveProperty('results');
    expect(responseBody.results).toBeInstanceOf(Array<Object>);
  });

});