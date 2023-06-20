import { ReactNode } from 'react';
import * as S from './LayoutStyle';
import { TabBar } from '@commons/index';

interface LayoutProps {
  children: ReactNode;
  hasTabBar: boolean;
}

export const Layout = ({ children, hasTabBar }: LayoutProps) => {
  return (
    <S.Wrap>
      <S.Layout>
        {children}
        {hasTabBar && (
          <S.Footer>
            <TabBar />
          </S.Footer>
        )}
      </S.Layout>
    </S.Wrap>
  );
};
