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
import { Category } from '@type-store/services/category';

export const HomeList = ({
  selectedCategory,
  userMainLocationIdx,
}: {
  selectedCategory: Category | undefined;
  userMainLocationIdx: number;
}) => {
  return (
    <ReactQuerySuspense>
      <Contents
        selectedCategory={selectedCategory}
        userMainLocationIdx={userMainLocationIdx}
      />
    </ReactQuerySuspense>
  );
};

const Contents = ({
  selectedCategory,
  userMainLocationIdx,
}: {
  selectedCategory: Category | undefined;
  userMainLocationIdx: number;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      [
        'home-items',
        { selectedCategory: selectedCategory?.idx, userMainLocationIdx },
      ],
      ({ pageParam = 0 }) => {
        return getItemListAPI(pageParam, selectedCategory?.idx);
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
