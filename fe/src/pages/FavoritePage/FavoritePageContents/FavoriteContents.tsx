import { ListItem, Error, Loading } from '@commons/index';
import * as S from './FavoriteContentsStyle';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getFavoriteItemsAPI } from '@services/items/favoriteItems';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR_MESSAGE } from '@constants/error';

interface FavoriteContentsProps {
  categoryIdx?: number;
}

export const FavoriteContents = ({ categoryIdx }: FavoriteContentsProps) => {
  const navigate = useNavigate();
  const [{ data: items, error, loading }, contentsFetch] = useFetch(
    getFavoriteItemsAPI.bind(null, categoryIdx),
    []
  );
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    contentsFetch();
  }, [categoryIdx]);

  useEffect(() => {
    if (!updateFlag) return;
    contentsFetch();
    setUpdateFlag(false);
  }, [updateFlag]);

  const renderComps = () => {
    if (loading) {
      return <Loading />;
    }
    if (error || !items) {
      return <Error>{error ? error.message : ERROR_MESSAGE.UNDEFINED}</Error>;
    }

    if (items.length === 0) {
      return <Error>관심 상품으로 등록된 상품이 없어요.</Error>;
    }

    return items.map((item) => (
      <ListItem
        key={item.itemIdx}
        {...item}
        onClick={() => navigate(`/item/${item.itemIdx}`)}
        setUpdateFlag={setUpdateFlag}
      ></ListItem>
    ));
  };

  return <S.FavoriteContents>{renderComps()}</S.FavoriteContents>;
};
