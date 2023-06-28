import { Layout } from '@commons/index';
import * as S from './FavoritePageStyle';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getFavoriteCategoryAPI } from '@services/categories/categories';
import { FavoriteContents } from './FavoritePageContents/FavoriteContents';
import { useState } from 'react';

export const FavoritesPage = () => {
  const [{ data: categories }, categoryFetch] = useFetch(
    getFavoriteCategoryAPI,
    [],
    true
  );

  let navbarCategories = [{ text: '전체', idx: -1 }];
  if (categories) {
    navbarCategories = [...navbarCategories, ...categories];
  }

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(-1);

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: '관심 목록',
          categoryInfo: {
            categories: navbarCategories,
            selectedCategoryIdx,
            onClick: ({ currentTarget }) =>
              setSelectedCategoryIdx(parseInt(currentTarget.id)),
          },
        },
      }}
      footerOption={{ type: 'tab' }}
    >
      <S.FavoritePage>
        <FavoriteContents categoryIdx={selectedCategoryIdx}></FavoriteContents>
      </S.FavoritePage>
    </Layout>
  );
};
