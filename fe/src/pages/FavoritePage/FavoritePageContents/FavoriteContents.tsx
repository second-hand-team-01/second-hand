import { ListItem, Error, Loading } from '@commons/index';
import * as S from './FavoriteContentsStyle';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getFavoriteItemsAPI } from '@services/items/favoriteItems';
import { useContext, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ERROR_MESSAGE } from '@constants/error';
import { UserInfoContext } from '@stores/UserContext';

interface FavoriteContentsProps {
  categoryIdx?: number;
}

export const FavoriteContents = ({ categoryIdx }: FavoriteContentsProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ data, error, loading }, contentsFetch] = useFetch(
    getFavoriteItemsAPI.bind(null, categoryIdx),
    []
  );
  useEffect(() => {
    contentsFetch();
  }, [categoryIdx]);

  const userInfo = useContext(UserInfoContext);

  const renderComps = () => {
    if (userInfo?.isLoggedIn === false) {
      return <Navigate to="/profile" replace />;
    }
    if (loading) {
      return <Loading />;
    }
    if (error || !data || !data.items) {
      return <Error>{error ? error.message : ERROR_MESSAGE.UNDEFINED}</Error>;
    }

    if (data.items.length === 0) {
      return <Error>관심 상품으로 등록된 상품이 없어요.</Error>;
    }

    return data.items.map((item) => (
      <ListItem
        key={item.itemIdx}
        {...item}
        onClick={() => {
          navigate(`/item/${item.itemIdx}`, {
            state: { prevPathname: pathname, itemLocation: item.location },
          });
        }}
      ></ListItem>
    ));
  };

  return <S.FavoriteContents>{renderComps()}</S.FavoriteContents>;
};
