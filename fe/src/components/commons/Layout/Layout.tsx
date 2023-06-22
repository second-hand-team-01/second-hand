import { Outlet } from 'react-router-dom';
import * as S from './LayoutStyle';
import { TabBar, ToolBar } from '@commons/index';
import { ReactNode } from 'react';
import { ChatBar, FilterBar, InfoBar, NavBar } from '@commons/index';
import { HeaderProps, FooterProps, LayoutStyleProps } from './LayoutStyle';

interface LayoutProps extends LayoutStyleProps {
  children?: ReactNode;
}

const renderHeader = (
  type: HeaderProps['type'],
  props: HeaderProps['navbarOptions']
) => {
  switch (type) {
    case 'filter':
      return <FilterBar></FilterBar>;
    case 'nav':
      return <NavBar {...props}></NavBar>;
    default:
      return <></>;
  }
};

const renderFooter = (type: FooterProps['type']): ReactNode => {
  switch (type) {
    case 'info':
      return <InfoBar></InfoBar>;
    case 'chat':
      return <ChatBar></ChatBar>;
    case 'tab':
      return <TabBar></TabBar>;
    case 'tool':
      return <ToolBar></ToolBar>;
    default:
      return <></>;
  }
};

export const Layout = ({
  headerOption,
  footerOption,
  children,
}: LayoutProps) => {
  return (
    <S.Wrap>
      <S.Layout headerOption={headerOption} footerOption={footerOption}>
        <S.Header>
          {headerOption !== undefined &&
            renderHeader(headerOption.type, headerOption.navbarOptions)}
        </S.Header>
        <S.Contents>
          <Outlet></Outlet>
          {children}
        </S.Contents>
        {footerOption !== undefined && (
          <S.Footer>{renderFooter(footerOption.type)}</S.Footer>
        )}
      </S.Layout>
    </S.Wrap>
  );
};
