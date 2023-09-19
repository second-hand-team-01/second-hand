import { ListItem, Loading } from '@components/commons';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import { getItemListAPI, convertItemsToListItems } from '@services/items/items';
import * as S from '../HomePageStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ReactQuerySuspense } from '@components/commons/ReactQuerySuspense/ReactQuerySuspense';

export const HomeList = ({ categoryIdx, userMainLocationIdx }) => {
  return (
    <ReactQuerySuspense>
      <Contents
        categoryIdx={categoryIdx}
        userMainLocationIdx={userMainLocationIdx}
      ></Contents>
    </ReactQuerySuspense>
  );
};

const Contents = ({ categoryIdx, userMainLocationIdx }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const queryKey = ['home-items', { categoryIdx, userMainLocationIdx }];
  const queryQuery = async ({ pageParam = 0 }) => {
    const items = await getItemListAPI(pageParam, categoryIdx);
    return items;
  };

  const getNextPageParam = (lastPage, allPages) => {
    if (lastPage.hasNext) {
      return allPages.length;
    }
    return undefined;
  };

  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    queryKey,
    queryQuery,
    { getNextPageParam }
  );

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  };

  const setTarget = useIntersectionObserver(handleIntersection);

  return (
    <>
      {data?.pages
        .flatMap((pageData) => convertItemsToListItems(pageData.items))
        .map((item) => (
          <ListItem
            key={item.itemIdx}
            {...item}
            onClick={() =>
              navigate(`/item/${item.itemIdx}`, { state: pathname })
            }
          ></ListItem>
        ))}
      <S.ObserverTarget ref={setTarget}></S.ObserverTarget>
      {isFetchingNextPage && <Loading height="40px" />}
    </>
  );
};
