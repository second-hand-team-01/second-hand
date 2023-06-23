import { ACCESS_TOKEN } from '@constants/apis';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) return accessToken;
  else return null;
};
