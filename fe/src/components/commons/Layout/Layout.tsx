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
  filterBarProps,
  bottomComps,
}: {
  type: HeaderProps['type'];
  navbarProps?: HeaderProps['navbarOptions'];
  filterBarProps?: HeaderProps['filterBarOptions'];
  bottomComps?: HeaderProps['bottomComp'];
}) => {
  switch (type) {
    case 'filter':
      return <FilterBar {...filterBarProps}></FilterBar>;
    case 'nav':
      return <NavBar {...navbarProps} bottomComps={bottomComps}></NavBar>;
    default:
      return <></>;
  }
};

const renderFooter = ({
  type,
  infoBarProps,
  comps,
}: {
  type: FooterProps['type'];
  infoBarProps: FooterProps['infoBarOptions'];
  comps: FooterProps['comp'];
}): ReactNode => {
  if (comps) {
    return comps;
  }
  switch (type) {
    case 'info':
      return <InfoBar {...infoBarProps}></InfoBar>;
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
              filterBarProps: headerOption.filterBarOptions,
              bottomComps: headerOption.bottomComp,
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
              comps: footerOption.comp,
            })}
          </S.Footer>
        )}
      </S.Layout>
    </S.Wrap>
  );
};
