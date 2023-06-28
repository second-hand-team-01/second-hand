import { ListItem } from '@commons/index';
import * as S from './FavoriteContentsStyle';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getFavoriteItemsAPI } from '@services/items/favoriteItems';
import { useEffect } from 'react';

interface FavoriteContentsProps {
  categoryIdx?: number;
}

export const FavoriteContents = ({ categoryIdx }: FavoriteContentsProps) => {
  const [{ data: contents }, contentsFetch] = useFetch(
    getFavoriteItemsAPI.bind(null, categoryIdx),
    []
  );

  useEffect(() => {
    contentsFetch();
  }, [categoryIdx]);

  return (
    <S.FavoriteContents>
      {contents?.map((list) => (
        <ListItem key={list.id} {...list}></ListItem>
      ))}
    </S.FavoriteContents>
  );
};
