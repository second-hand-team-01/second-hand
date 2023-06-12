import * as S from './LayoutStyle';

interface LayoutProps {
  hasTabBar: boolean;
}

export const Layout = ({ hasTabBar }: LayoutProps) => {
  return (
    <S.Wrap>
      <S.Layout>{hasTabBar && <S.Footer>TabBar</S.Footer>}</S.Layout>
    </S.Wrap>
  );
};
