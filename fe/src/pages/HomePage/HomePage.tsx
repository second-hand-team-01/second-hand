import { Layout, ListItem, Spinner } from '@commons/index';
import * as S from './HomePageStyle';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import { useEffect, useState } from 'react';
import {
  ConvertedGetItemsRes,
  ListItemPropsWithId,
} from '@type-store/services/items';
import { getItemsAPI } from '@services/items/items';
import { useFetch } from '@hooks/useFetch/useFetch';
import { Button } from '@commons/index';
import { useLocation, useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      errorMsg && setErrorMsg(null);
      const { data, error } = await getItemsAPI(page);
      if (error) return setErrorMsg(error.message);
      if (data) {
        setHasNext(data.hasNext);
        setItems((prevItems) => [...prevItems, ...data.items]);
      }
      setLoading(false);
    })();
  }, [page]);

  const [items, setItems] = useState<ListItemPropsWithId[]>([]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (hasNext) setPage((prevPage) => prevPage + 1);
      }
    });
  };

  const setTarget = useIntersectionObserver(handleIntersection);

  const isInitialLoading = loading && page === 0;
  const isNextPageLoading = loading && page !== 0;

  return (
    <Layout headerOption={{ type: 'filter' }} footerOption={{ type: 'tab' }}>
      <S.Home>
        {errorMsg ? (
          <S.Error>{errorMsg}</S.Error>
        ) : isInitialLoading ? (
          <S.InitialLoading>
            <Spinner />
          </S.InitialLoading>
        ) : (
          <>
            {items?.map((item: ListItemPropsWithId) => (
              <ListItem
                key={item.id}
                {...item}
                onClick={() =>
                  navigate(`/item/${item.id}`, { state: pathname })
                }
              ></ListItem>
            ))}
            <S.ObserverTarget ref={setTarget}></S.ObserverTarget>
            {isNextPageLoading && (
              <S.NextPageLoading>
                <Spinner />
              </S.NextPageLoading>
            )}
          </>
        )}
        <S.FloatingBtn>
          <Button
            shape={'floating'}
            icon="plus"
            color={'accentText'}
            onClick={() => navigate('/write', { state: pathname })}
          ></Button>
        </S.FloatingBtn>
      </S.Home>
    </Layout>
  );
};
