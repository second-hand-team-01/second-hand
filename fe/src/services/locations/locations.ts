import { API_URL } from '@constants/apis';
import { ERROR_MESSAGE } from '@constants/error';

export const getAllLocationData = async () => {
  try {
    const res = await fetch(`${API_URL}/locations`);
    if (!res.ok) {
      throw new Error(ERROR_MESSAGE['UNDEFINED']);
    }
    const locationData = await res.json();
    return locationData.data;
  } catch (error) {
    return error;
  }
};

export const putUserLocation = async (
  mainLocationIdx: number | null | undefined,
  subLocationIdx: number | null | undefined
) => {
  try {
    const token = localStorage.getItem('loginToken');
    const response = await fetch(`${API_URL}/location`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        main: mainLocationIdx,
        sub: subLocationIdx,
      }),
    });

    const userLocationData = await response.json();

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE['UNDEFINED']);
    }
    return userLocationData.data;
  } catch (error) {
    return error;
  }
};

export const isSelectedLocation = (selectedLocation, locationData) => {
  return selectedLocation.locationIdx === locationData.locationIdx;
};
