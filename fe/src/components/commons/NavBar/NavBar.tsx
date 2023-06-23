import * as S from './NavBarStyle';
import { Button, Tab } from '@commons/index';
import { icons } from '@assets/icons';
import { TabProps } from '@commons/Tab/Tab';
import { ReactNode } from 'react';

export interface NavBarProps {
  title?: string;
  leftBtn?: ReactNode;
  rightBtn?: ReactNode;
  tabInfo?: TabProps;
}

export const NavBar = ({ title, leftBtn, rightBtn, tabInfo }: NavBarProps) => {
  return (
    <S.Header>
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
