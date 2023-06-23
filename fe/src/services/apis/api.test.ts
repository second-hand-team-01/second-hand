import { addQueriesToURL, customFetch } from './apis';
import { HOST } from '@constants/apis';
import fetch from 'jest-fetch-mock';

global.fetch = require('jest-fetch-mock');
fetch.enableMocks();

test('customFetch에 query들을 전달할 경우 queryString으로 변환되어 url에 들어가야 한다.', () => {
  const url = '/test';
  const queries = {
    a: 'a',
    b: 'b',
    c: undefined,
  };
  const urlWithQueries = '/test?a=a&b=b';
  expect(addQueriesToURL(url, queries)).toEqual(urlWithQueries);
});

describe('customFetch', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('customFetch를 호출하고 응답에 data가 없을 경우 에러를 출력해야 한다.', async () => {
    // TODO
  });

  test('customFetch에 options이 있을 경우 header에 options의 각 property를 넣어주어야 한다.', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: 'dummy data' }));

    await customFetch({
      method: 'GET',
      path: '/test',
      options: {
        'Custom-Header': 'Custom Value',
      },
    });

    const calls = fetch.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(`${HOST}/test`);
    expect(calls[0][1]).toMatchObject({
      method: 'GET',
      headers: {
        'Custom-Header': 'Custom Value',
      },
    });
  });

  test('customFetch의 body의 타입이 json일 경우 헤더의 contents-type을 json으로 설정해주어야 한다.', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: 'dummy data' }));

    await customFetch({
      method: 'POST',
      path: '/test',
      body: {
        key: 'value',
      },
    });

    const calls = fetch.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(`${HOST}/test`);
    expect(calls[0][1]).toMatchObject({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('customFetch의 auth가 true일 경우 헤더에 authorization에 설정을 해줘야 한다.', () => {}); // TODO
});
