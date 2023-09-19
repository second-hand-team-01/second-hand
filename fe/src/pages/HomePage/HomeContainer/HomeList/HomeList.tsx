import { ListItem, Loading } from '@components/commons';
import { convertItemsToListItems, getItemListAPI } from '@services/items/items';
import { useMemo, useState } from 'react';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from '../../HomePageStyle';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';

export const HomeList = ({ categoryIdx, userMainLocationIdx }) => {
  const { pathname } = useLocation();

  const getItemList = ({ queryKey }: { queryKey: QueryKey }) => {
    const [_key, { page, categoryIdx }] = queryKey as [string, any];
    return getItemListAPI(page, categoryIdx);
  };
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: [
      'home-items',
      { page, categoryIdx, userMainLocationIdx: 0 },
    ] as QueryKey,
    queryFn: getItemList,
  });

  const convertedItems = useMemo(
    () => data && convertItemsToListItems(data.items),
    [data]
  );

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (!isLoading && data?.hasNext) {
          setPage((page) => page + 1);
        }
      }
    });
  };

  const setTarget = useIntersectionObserver(handleIntersection);

  return (
    <>
      {convertedItems?.map((item) => (
        <ListItem
          key={item.itemIdx}
          {...item}
          onClick={() => navigate(`/item/${item.itemIdx}`, { state: pathname })}
        ></ListItem>
      ))}
      <S.ObserverTarget ref={setTarget}></S.ObserverTarget>
      {page !== 0 && <Loading height="40px" />}
    </>
  );
};
