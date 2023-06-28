import { ListItem, Error } from '@commons/index';
import * as S from './FavoriteContentsStyle';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getFavoriteItemsAPI } from '@services/items/favoriteItems';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FavoriteContentsProps {
  categoryIdx?: number;
}

export const FavoriteContents = ({ categoryIdx }: FavoriteContentsProps) => {
  const navigate = useNavigate();
  const [{ data: items }, contentsFetch] = useFetch(
    getFavoriteItemsAPI.bind(null, categoryIdx),
    []
  );

  useEffect(() => {
    contentsFetch();
  }, [categoryIdx]);

  return (
    <S.FavoriteContents>
      {items && items.length !== 0 ? (
        items.map((item) => (
          <ListItem
            key={item.id}
            {...item}
            onClick={() => navigate(`/item/${item.id}`)}
          ></ListItem>
        ))
      ) : (
        <Error>관심 상품으로 등록된 상품이 없어요.</Error>
      )}
    </S.FavoriteContents>
  );
};
