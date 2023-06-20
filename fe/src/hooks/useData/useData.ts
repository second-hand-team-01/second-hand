import { useEffect, useState } from 'react';
import { customFetch, FetchProps } from '@services/apis/apis';

export const useData = <R, B>(fetchProps: FetchProps<B>): R | null => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await customFetch(fetchProps);
        if (fetchedData && fetchedData.error) {
          console.error(`Error: ${fetchedData.error}`);
          return null;
        }
        setData(fetchedData as any);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
        }
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useData;
