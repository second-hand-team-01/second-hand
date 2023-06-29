import { Layout, ListItem, Error, Button, Loading } from '@commons/index';
import * as S from './HomePageStyle';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver/useIntersectionObserver';
import { useEffect, useState, useContext } from 'react';
import { ListItemProps } from '@commons/ListItem/ListItem';
import { getItemsAPI } from '@services/items/items';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryPopup } from './CategoryPopup/CategoryPopup';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';
import { UserContext } from '@stores/UserContext';
import { LOCATION_FALLBACK } from '@constants/login';

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
  const [categoryState, categoryFetch] = useFetch(getCategoryAPI, []);
  const [categoryAndPage, setCategoryAndPage] = useState<CategoryAndPage>({
    page: 0,
    categoryIdx: undefined,
  });
  const { page, categoryIdx } = categoryAndPage;
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { locationIdx, locationName } = userInfo.main;

  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const runAPI = async ({ page, categoryIdx }: CategoryAndPage) => {
    !loading && setLoading(true);
    errorMsg && setErrorMsg(null);

    const { data, error } = await getItemsAPI(page, categoryIdx, locationIdx);
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

  const [items, setItems] = useState<ListItemProps[]>([]);

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
            openState: [isLocationDropdownOpen, setLocationDropdownOpen],
            region: isLoggedIn
              ? locationName ?? LOCATION_FALLBACK.locationName
              : LOCATION_FALLBACK.locationName,
            handleFilterBtnClick: () => {
              setCategoryPopupOpen(true);
              !categoryState.data && categoryFetch();
            },
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
              {items?.map((item: ListItemProps) => (
                <ListItem
                  key={item.itemIdx}
                  {...item}
                  onClick={() =>
                    navigate(`/item/${item.itemIdx}`, { state: pathname })
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
              backgroundColor="accentBackgroundPrimary"
              onClick={() => navigate('/write', { state: pathname })}
            ></Button>
          </S.FloatingBtn>
        </S.Home>
      </Layout>
      {isCategoryPopupRendered && (
        <CategoryPopup
          categoryState={categoryState}
          categoryFetch={categoryFetch}
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
