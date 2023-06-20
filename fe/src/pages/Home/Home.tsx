import { ListItem } from '@commons/index';
import { convertItemsToListItems } from '@services/items/items';
import { Item } from '@type-store/items';
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
  const [items, setItems] = useState(data ? data.items : []);
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
    page !== 0 && refetch();
  }, [page]);

  useEffect(() => {
    data && setItems([...items, ...data.items]);
  }, [data]);

  return loading && page === 0 ? (
    <S.InitialLoading>로딩중</S.InitialLoading>
  ) : (
    <S.Home>
      {items?.map((item: ListItemPropsWithId) => (
        <ListItem key={item.id} {...item}></ListItem>
      ))}
      <div ref={setTarget}></div>
      {loading && page !== 0 && <S.NextPageLoading>로딩중2</S.NextPageLoading>}
    </S.Home>
  );
};
