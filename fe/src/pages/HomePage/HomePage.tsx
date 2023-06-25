import { Layout, ListItem, Error, Button, Loading } from '@commons/index';
import * as S from './HomePageStyle';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import { useEffect, useState } from 'react';
import { ListItemPropsWithId } from '@type-store/services/items';
import { getItemsAPI } from '@services/items/items';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryPopup } from './CategoryPopup/CategoryPopup';
import { Category } from '@type-store/services/category';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';

export const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const [categoryState] = useFetch(getCategoryAPI, [], true);

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number | null>(
    null
  );

  const runAPI = async (page: number) => {
    !loading && setLoading(true);
    errorMsg && setErrorMsg(null);

    const getCategoryIdx = () => {
      if (selectedCategoryIdx && selectedCategoryIdx !== -1) {
        return selectedCategoryIdx;
      } else return undefined;
    };

    const { data, error } = await getItemsAPI(page, getCategoryIdx());
    if (error) return setErrorMsg(error.message);
    if (data) {
      setHasNext(data.hasNext);

      if (page === 0) {
        setItems(data.items);
        if (scrollY !== 0) scrollTo({ top: 0 });
      } else setItems((prevItems) => [...prevItems, ...data.items]);
    }
    setLoading(false);
  };

  useEffect(() => {
    runAPI(page);
  }, [page]);

  useEffect(() => {
    if (selectedCategoryIdx !== null) {
      if (selectedCategoryIdx === -1) {
        setPage(0);
        runAPI(0);
      } else if (page === 0) {
        runAPI(0);
      } else {
        setPage(0);
      }
    }
  }, [selectedCategoryIdx]);

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
    <>
      <Layout
        headerOption={{
          type: 'filter',
          filterBarOptions: {
            region: '우면동',
            handleFilterBtnClick: (e) => setCategoryPopupOpen(true),
            handleDeleteBtn: () => setSelectedCategoryIdx(-1),
            selectedCategory: categoryState.data?.find(
              (category) => category.idx === selectedCategoryIdx
            ),
          },
        }}
        footerOption={{ type: 'tab' }}
      >
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
      <CategoryPopup
        categoryState={categoryState}
        categoryPopupOpenState={[isCategoryPopupOpen, setCategoryPopupOpen]}
        selectedCategoryIdxState={[selectedCategoryIdx, setSelectedCategoryIdx]}
        handleCategoryClick={async () => await getItemsAPI(page)}
      ></CategoryPopup>
    </>
  );
};
