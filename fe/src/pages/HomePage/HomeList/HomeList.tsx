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
  selectedLocationIdx,
}: {
  selectedCategory: Category | undefined;
  selectedLocationIdx: number | null | undefined;
}) => {
  return (
    <ReactQuerySuspense>
      <Contents
        selectedCategory={selectedCategory}
        selectedLocationIdx={selectedLocationIdx}
      />
    </ReactQuerySuspense>
  );
};

const Contents = ({
  selectedCategory,
  selectedLocationIdx,
}: {
  selectedCategory: Category | undefined;
  selectedLocationIdx: number | null | undefined;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      [
        'home-items',
        { selectedCategory: selectedCategory?.idx, selectedLocationIdx },
      ],
      ({ pageParam = 0 }) => {
        return getItemListAPI(
          pageParam,
          selectedCategory?.idx,
          selectedLocationIdx
        );
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
