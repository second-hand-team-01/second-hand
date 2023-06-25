import { Button, Layout, NavbarBtn, Portal } from '@commons/index';
import * as S from './CategoryElementStyle';
import { useEffect } from 'react';
import { Category } from '@type-store/services/category';

interface CategoryPopupProps {
  idx: string;
  text: Category['text'];
  imgUrl: Category['imgUrl'];
}

export const CategoryElement = ({ idx, text, imgUrl }: CategoryPopupProps) => {
  return (
    <S.CategoryElement id={idx}>
      <S.CategoryElementImg src={imgUrl}></S.CategoryElementImg>
      {text}
    </S.CategoryElement>
  );
};
