import { API_URL } from '@constants/apis';

export const getLocationData = async () => {
  const res = await fetch(`${API_URL}/locations`);
  const locationData = await res.json();
  return locationData.data;
};
