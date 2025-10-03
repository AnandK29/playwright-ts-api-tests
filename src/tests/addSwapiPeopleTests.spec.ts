import {test, expect} from '@playwright/test';
import { ApiRequests } from '../main/utils/apiRequests';
import { addSwapiPeoplePayload } from '../main/dtos/request-dto/addSwapiPeopleReqDto';
import addPeopleData from '../main/testData/addPeopleData.json';
import { endpoints } from '../main/test-urls/testUrls';
import { generateCustomHeaders } from '../main/utils/commons';

test('add a new person in swapi db', async ({ request }) => {
  let postApiRequest = new ApiRequests(request);

  await test.step('call add people api', async () => {
    let addPeoplePayload = new addSwapiPeoplePayload();

    let payloadBody = await addPeoplePayload.getAddSwapiPeopleApiPayload({ ...addPeopleData.person1 });
    let customHeaders = {'x-test-systems': 'swapi-qa'};
    let requestHeaders = await generateCustomHeaders(customHeaders);

    console.log(`request body:\n ${payloadBody}`);
    let response = await postApiRequest.postApiRequest(endpoints.addPeople, {...payloadBody}, requestHeaders);
    
    // valiate response code & read reponse headers & body.
    expect(response.status()).toBe(403);
    let responseHeaders = await response.headers();
    let responseBody = await response.json();
    console.log(`response body:\n ${responseBody}`);
    
    // response header validations
    expect(responseHeaders['server']).toContain('nginx');
    
    // response body validation
    //expect(responseBody.name).toBe(addPeopleData.person1.name);
  });

});