import { Outlet } from 'react-router-dom';
import { TabBar } from '@commons/TabBar/TabBar';
import * as S from './LayoutStyle';

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
