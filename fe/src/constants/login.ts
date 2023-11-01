export const OAUTH_CLIENT_ID =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_OAUTH_CLIENT_ID_PROD
    : process.env.REACT_APP_OAUTH_CLIENT_ID_DEV;

export const LOCATION_FALLBACK = { locationIdx: 1, town: '역삼1동' };

export const USER_INFO_KEY = 'USER_INFO';
