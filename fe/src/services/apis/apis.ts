import { removeEmptyKeyValues, getType, Type } from '@utils/common/common';
import { HOST, ACCESS_TOKEN } from '@constants/apis';
import { getAccessToken } from '@services/login/login';
import { ERROR_MESSAGE } from '@constants/error';

export interface FetchProps<B> {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT';
  path: string;
  queries?: object;
  body?: B;
  auth?: boolean;
  options?: HeadersInit;
}

export const addQueriesToURL = (url: string, queries: object) => {
  const copiedQueries = removeEmptyKeyValues(queries);
  const queryString = copiedQueries
    ? '?' + new URLSearchParams(Object.entries(copiedQueries)).toString()
    : '';
  const urlWithQueries = url + queryString;
  return urlWithQueries;
};

export const setHeader = <B>(
  body?: B,
  options?: HeadersInit,
  auth?: boolean
) => {
  let headers = {};

  if (getType(body) === Type.LiteralObject) {
    headers['Content-Type'] = 'application/json';
  }

  if (options) {
    headers = Object.assign(headers, options);
  }

  if (auth) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return {}; // TODO: 로그아웃
    }
    headers['Authorization'] = localStorage.getItem(ACCESS_TOKEN);
  }

  return headers;
};

export type Response<D> = {
  data?: D;
  error?: Error;
};

export const customFetch = async <B, D>({
  path,
  queries,
  method,
  body,
  auth = false,
  options,
}: FetchProps<B>): Promise<Response<D>> => {
  let url = HOST + path;

  if (queries) {
    url = addQueriesToURL(url, queries);
  }

  const init: RequestInit = {
    method,
    body:
      getType(body) === Type.LiteralObject
        ? JSON.stringify(body)
        : (body as BodyInit),
  };

  const headers = setHeader<B>(body, options, auth);

  if (headers) {
    Object.assign(init, { headers });
  }

  try {
    const res = await fetch(url, init);
    if (res.ok) {
      const resJSON = await res.json();
      if (resJSON.data === undefined) {
        return {
          error: new Error(`${ERROR_MESSAGE['NO_DATA']}`),
        };
      }
      const data = resJSON.data;
      return { data };
    }
    return {
      error: new Error(
        `${ERROR_MESSAGE[res.status] ?? ERROR_MESSAGE['UNDEFINED']}`
      ),
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: new Error(`${error.message}`) }; // 이 부분은 어떤 에러가 발생하는걸까?
    }
    return { error: new Error(ERROR_MESSAGE['UNDEFINED']) };
  }
};
