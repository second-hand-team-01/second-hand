import * as S from './NavBarStyle';
import { Tab } from '@commons/index';
import { TabProps } from '@commons/Tab/Tab';
import { ReactNode } from 'react';

export interface NavBarProps {
  title?: string;
  leftBtn?: ReactNode;
  rightBtn?: ReactNode;
  tabInfo?: TabProps;
  isTransparent?: boolean;
}

export const NavBar = ({
  title,
  leftBtn,
  rightBtn,
  tabInfo,
  isTransparent = false,
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
    </S.Header>
  );
};
