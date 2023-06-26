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

interface CategoryAndPage {
  page: number;
  categoryIdx: number | undefined;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const [isCategoryPopupRendered, setCategoryPopupRendered] = useState(false);
  const [categoryState] = useFetch(getCategoryAPI, [], true);
  const [categoryAndPage, setCategoryAndPage] = useState<CategoryAndPage>({
    page: 0,
    categoryIdx: undefined,
  });
  const { page, categoryIdx } = categoryAndPage;

  const runAPI = async ({ page, categoryIdx }: CategoryAndPage) => {
    !loading && setLoading(true);
    errorMsg && setErrorMsg(null);

    const { data, error } = await getItemsAPI(page, categoryIdx);
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
    runAPI(categoryAndPage);
  }, [categoryAndPage]);

  useEffect(() => {
    setCategoryPopupRendered(true);
  }, []);

  const [items, setItems] = useState<ListItemPropsWithId[]>([]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (!loading && hasNext) {
          setCategoryAndPage((prevCategoryAndPage) => ({
            ...prevCategoryAndPage,
            page: prevCategoryAndPage.page + 1,
          }));
        }
      }
    });
  };

  const handleDeleteBtn = () => {
    setCategoryAndPage({
      page: 0,
      categoryIdx: undefined,
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
            handleFilterBtnClick: () => setCategoryPopupOpen(true),
            handleDeleteBtn,
            selectedCategory: categoryState.data?.find(
              (category) => category.idx === categoryIdx
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
      {isCategoryPopupRendered && (
        <CategoryPopup
          categoryState={categoryState}
          categoryPopupOpenState={[isCategoryPopupOpen, setCategoryPopupOpen]}
          selectCategoryIdx={(selectedCategoryIdx) =>
            setCategoryAndPage({
              categoryIdx: selectedCategoryIdx,
              page: 0,
            })
          }
        ></CategoryPopup>
      )}
    </>
  );
};
