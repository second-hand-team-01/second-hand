import * as S from './NavBarStyle';
import { Tab, Button } from '@commons/index';
import { TabProps } from '@commons/Tab/Tab';
import { Category } from '@type-store/services/category';
import { ReactNode, MouseEvent } from 'react';

export interface NavBarProps {
  title?: string;
  leftBtn?: ReactNode;
  rightBtn?: ReactNode;
  tabInfo?: TabProps;
  categoryInfo?: {
    categories: Category[];
    selectedCategoryIdx: number;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  isTransparent?: boolean;
}

export const NavBar = ({
  title,
  leftBtn,
  rightBtn,
  tabInfo,
  isTransparent = false,
  categoryInfo,
}: NavBarProps) => {
  return (
    <S.Header isTransparent={isTransparent}>
      <S.HeaderTop>
        <S.ButtonContainer>{leftBtn}</S.ButtonContainer>
        <S.Title>{title}</S.Title>
        <S.ButtonContainer>{rightBtn}</S.ButtonContainer>
      </S.HeaderTop>
      {tabInfo && (
        <S.HeaderBottom>
          <Tab {...tabInfo}></Tab>
        </S.HeaderBottom>
      )}
      {categoryInfo?.categories.map((category) => {
        const isActive = category.idx === categoryInfo.selectedCategoryIdx;
        return (
          <Button
            key={category.idx}
            id={String(category.idx)}
            title={category?.text}
            state={isActive ? 'active' : 'default'}
            hasBorder={true}
            shape="small"
            color={isActive ? 'accentText' : 'neutralText'}
            onClick={categoryInfo.onClick}
          ></Button>
        );
      })}
    </S.Header>
  );
};
