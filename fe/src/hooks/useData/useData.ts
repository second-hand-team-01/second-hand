import { useEffect, useState } from 'react';
import { customFetch, FetchProps } from '@services/apis/apis';

const useData = <B>(fetchProps: FetchProps<B>) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await customFetch(fetchProps);
        if (fetchedData && fetchedData.error) {
          console.error(`Error: ${fetchedData.error}`);
          return;
        }
        setData(fetchedData);
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
