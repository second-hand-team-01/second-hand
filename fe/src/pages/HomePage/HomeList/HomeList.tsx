import { ListItem, Loading } from '@components/commons';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import {
  getItemListAPI,
  convertItemListToListItems,
} from '@services/items/items';
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
      />
    </ReactQuerySuspense>
  );
};

const Contents = ({ categoryIdx, userMainLocationIdx }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['home-items', { categoryIdx, userMainLocationIdx }],
      ({ pageParam = 0 }) => {
        return getItemListAPI(pageParam, categoryIdx);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.hasNext) {
            return allPages.length;
          }
          return undefined;
        },
        select: (data) => {
          const newPages = data.pages.map((page) =>
            convertItemListToListItems(page)
          );
          return { ...data, pages: newPages };
        },
        staleTime: 10000,
        cacheTime: 12000,
      }
    );

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  const setTarget = useIntersectionObserver(handleIntersection);

  return (
    <>
      {data?.pages
        .flatMap((pageData) => pageData.items)
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
