import { Outlet } from 'react-router-dom';
import * as S from './LayoutStyle';
import { TabBar } from '@commons/index';
import { ReactNode } from 'react';

interface LayoutProps {
  hasTabBar: boolean;
  children?: React.ReactNode;
}

export const Layout = ({ hasTabBar }: LayoutProps) => {
  return (
    <S.Wrap>
      <S.Layout>
        <Outlet />
        {hasTabBar && (
          <S.Footer>
            <TabBar />
          </S.Footer>
        )}
      </S.Layout>
    </S.Wrap>
  );
};
