import { useData } from '@hooks/useData/useData';
import { ListItem } from '@commons/index';
import { convertItemsToListItems } from '@services/items/items';
import { Item } from '@type-store/items';
import * as S from './HomeStyle';
import useInfinityScroll from '@hooks/useInfinityScroll/useInfinityScroll';
import { useEffect, useState } from 'react';
import { ListItemPropsWithId } from '@services/items/items';
import { customFetch } from '@services/apis/apis';
import { getItemsAPI } from '@services/items/items';

interface getItemsAPIResponse {
  hasNext: boolean;
  items: Item[];
}

export const Home = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<ListItemPropsWithId[] | null>(null);
  const [hasNext, setHasNext] = useState(false);

  const data = useData<getItemsAPIResponse, null>({
    path: '/items',
    method: 'GET',
    queries: { page: page },
  });

  useEffect(() => {
    if (data) {
      setItems(convertItemsToListItems(data.items));
      setHasNext(data.hasNext);
    }
  }, [data]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (!hasNext) return;
        setPage(page + 1);
        const data = await getItemsAPI(page + 1);

        if (data) {
          setItems([
            ...(items as ListItemPropsWithId[]),
            ...convertItemsToListItems(data.items),
          ]);
          setHasNext(data.hasNext);
        }
      }
    });
  };
  const targetRef = useInfinityScroll(handleIntersection);

  return items ? (
    <S.Home>
      {items.map((item) => (
        <ListItem key={item.id} {...item}></ListItem>
      ))}
      <div ref={targetRef}></div>
    </S.Home>
  ) : (
    <></>
  );
};
