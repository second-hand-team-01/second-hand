import { API_URL } from '@constants/apis';

export const getAllLocationData = async () => {
  const res = await fetch(`${API_URL}/locations`);
  const locationData = await res.json();
  return locationData.data;
};

export const getLocationData = async (id: string) => {
  const res = await fetch(`${API_URL}/locations/${id}`);
  const locationData = await res.json();
  return locationData.data;
};

export const putUserLocation = async (
  mainLocationIdx: number,
  subLocationIdx: number | null
) => {
  const response = await fetch(`${API_URL}/location`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      main: mainLocationIdx,
      sub: subLocationIdx,
    }),
  });

  const userLocationData = await response.json();

  if (!response.ok) {
    throw new Error(userLocationData.message);
  }
  return userLocationData.data;
};

export const isSelectedLocation = (userInfo, locationName) => {
  const mainLocationName = userInfo.mainLocation.locationName;
  const subLocationName = userInfo.subLocation.locationName;

  return mainLocationName === locationName || subLocationName === locationName;
};
