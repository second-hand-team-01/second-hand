import { Outlet } from 'react-router-dom';
import * as S from './LayoutStyle';
import { TabBar, ToolBar } from '@commons/index';
import { ReactNode } from 'react';
import { ChatBar, FilterBar, InfoBar, NavBar } from '@commons/index';
import { HeaderProps, FooterProps, LayoutStyleProps } from './LayoutStyle';

interface LayoutProps extends LayoutStyleProps {
  children?: ReactNode;
  isHeaderOverlapped?: boolean;
}

const renderHeader = ({
  type,
  navbarProps,
}: {
  type: HeaderProps['type'];
  navbarProps: HeaderProps['navbarOptions'];
}) => {
  switch (type) {
    case 'filter':
      return <FilterBar></FilterBar>;
    case 'nav':
      return <NavBar {...navbarProps}></NavBar>;
    default:
      return <></>;
  }
};

const renderFooter = ({
  type,
  infoBarProps,
}: {
  type: FooterProps['type'];
  infoBarProps: FooterProps['infoBarOptions'];
}): ReactNode => {
  switch (type) {
    case 'info':
      return <InfoBar {...infoBarProps}></InfoBar>;
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
  isHeaderOverlapped,
  children,
}: LayoutProps) => {
  return (
    <S.Wrap>
      <S.Layout headerOption={headerOption} footerOption={footerOption}>
        <S.Header isHeaderOverlapped={isHeaderOverlapped}>
          {headerOption !== undefined &&
            renderHeader({
              type: headerOption.type,
              navbarProps: headerOption.navbarOptions,
            })}
        </S.Header>
        <S.Contents isHeaderOverlapped={isHeaderOverlapped}>
          <Outlet></Outlet>
          {children}
        </S.Contents>
        {footerOption !== undefined && (
          <S.Footer>
            {renderFooter({
              type: footerOption.type,
              infoBarProps: footerOption.infoBarOptions,
            })}
          </S.Footer>
        )}
      </S.Layout>
    </S.Wrap>
  );
};
