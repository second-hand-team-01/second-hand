import { Layout, ListItem, Error, Button, Loading } from '@commons/index';
import * as S from './HomePageStyle';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import { useEffect, useState } from 'react';
import { ListItemPropsWithId } from '@type-store/services/items';
import { getItemsAPI } from '@services/items/items';
import { useLocation, useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      !loading && setLoading(true);
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
        if (!loading && hasNext) setPage((prevPage) => prevPage + 1);
      }
    });
  };

  const setTarget = useIntersectionObserver(handleIntersection);

  return (
    <Layout headerOption={{ type: 'filter' }} footerOption={{ type: 'tab' }}>
      <S.Home>
        {errorMsg ? (
          <Error>{errorMsg}</Error>
        ) : loading && page === 0 ? (
          <Loading />
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
            {loading && page !== 0 && <Loading height="40px" />}
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
