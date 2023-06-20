import { ListItem, Spinner } from '@commons/index';
import * as S from './HomeStyle';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import { useEffect, useState } from 'react';
import { ListItemPropsWithId } from '@services/items/items';
import { getItemsAPI, ConvertedGetItemsRes } from '@services/items/items';
import { useFetch } from '@hooks/useFetch/useFetch';

export const Home = () => {
  const [page, setPage] = useState(0);
  const [state, refetch] = useFetch<ConvertedGetItemsRes, null>(
    getItemsAPI.bind(null, page),
    []
  );

  const { loading, data, error } = state;
  const [items, setItems] = useState<ListItemPropsWithId[]>([]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (data?.hasNext) setPage((prevPage) => prevPage + 1);
      }
    });
  };

  const setTarget = useIntersectionObserver(handleIntersection);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (data) {
      setItems((prevItems) => [...prevItems, ...data.items]);
    }
  }, [data]);

  const isInitialLoading = loading && page === 0;
  const isNextPageLoading = loading && page !== 0;

  return (
    <S.Home>
      {error ? (
        <S.Error>{error.message}</S.Error>
      ) : isInitialLoading ? (
        <S.InitialLoading>
          <Spinner />
        </S.InitialLoading>
      ) : (
        <>
          {items?.map((item: ListItemPropsWithId) => (
            <ListItem key={item.id} {...item}></ListItem>
          ))}
          <div ref={setTarget}></div>
          {isNextPageLoading && (
            <S.NextPageLoading>
              <Spinner />
            </S.NextPageLoading>
          )}
        </>
      )}
    </S.Home>
  );
};
