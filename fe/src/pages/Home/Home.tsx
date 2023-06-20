import { ListItem } from '@commons/index';
import * as S from './HomeStyle';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import { useEffect, useState } from 'react';
import { ListItemPropsWithId } from '@services/items/items';
import { getItemsAPI } from '@services/items/items';
import { useFetch } from '@hooks/useFetch/useFetch';

export const Home = () => {
  const [page, setPage] = useState(0);
  const [state, refetch] = useFetch<any, any, any>(
    getItemsAPI.bind(null, page),
    []
  );

  const { loading, data, error } = state;
  const [items, setItems] = useState<any>([]);
  const hasNext = data ? data.hasNext : false;

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (!hasNext) return;
        setPage(page + 1);
      }
    });
  };

  const setTarget = useIntersectionObserver(handleIntersection);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    data && setItems([...items, ...data.items]);
  }, [data]);

  const isInitialLoading = loading && page === 0;
  const isNextPageLoading = loading && page !== 0;

  return (
    <S.Home>
      {error ? (
        <S.InitialLoading>{error.message}</S.InitialLoading>
      ) : isInitialLoading ? (
        <S.InitialLoading>로딩중</S.InitialLoading>
      ) : (
        <>
          {items?.map((item: ListItemPropsWithId) => (
            <ListItem key={item.id} {...item}></ListItem>
          ))}
          <div ref={setTarget}></div>
          {isNextPageLoading && <S.NextPageLoading>로딩중2</S.NextPageLoading>}
        </>
      )}
    </S.Home>
  );
};
