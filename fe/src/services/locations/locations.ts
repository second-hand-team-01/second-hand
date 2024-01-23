import { API_URL } from '@constants/apis';
import { ERROR_MESSAGE } from '@constants/error';
import { Response } from '@hooks/useFetch/useFetch';
import { LocationData } from '@type-store/services/location';
import { customFetch } from '@services/apis/apis';

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

export const getAllLocationDataAPI = async (): Promise<
  Response<LocationData[]>
> => {
  try {
    const res = (await customFetch<null, LocationData[]>({
      path: '/locations',
      method: 'GET',
    })) as Response<LocationData[]>;

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }

    const allLocationData = { ...res, data: res.data };

    return allLocationData;
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
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
