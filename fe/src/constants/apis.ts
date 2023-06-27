export const ACCESS_TOKEN = 'loginToken';

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export const HOST = API_URL;

export const URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_URL
    : process.env.REACT_APP_DEV_URL;
