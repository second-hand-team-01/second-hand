import styled from 'styled-components';
import { NavBarProps } from '@commons/NavBar/NavBar';
import { NAVBAR_HEIGHT, FOOTER_HEIGHT } from '@constants/style';
import { InfoBarProps } from '../InfoBar/InfoBar';

export interface HeaderProps {
  type: 'filter' | 'nav';
  navbarOptions?: NavBarProps;
}

export interface FooterProps {
  type: 'info' | 'chat' | 'tab' | 'tool' | undefined;
  infoBarOptions?: InfoBarProps;
}

export interface LayoutStyleProps {
  headerOption?: HeaderProps;
  footerOption?: FooterProps;
}

export interface isHeaderOverlappedType {
  isHeaderOverlapped?: boolean;
}

const getTemplateRows = (
  headerOption: HeaderProps | undefined,
  footerOption: FooterProps | undefined
) => {
  const hasHeader = headerOption !== undefined;
  const hasHeaderTab = headerOption?.navbarOptions?.tabInfo !== undefined;
  const hasFooter = footerOption !== undefined;

  const headerHeight = hasHeader
    ? hasHeaderTab
      ? NAVBAR_HEIGHT.top + NAVBAR_HEIGHT.bottom
      : NAVBAR_HEIGHT.top
    : 0;
  const footerHeight = hasFooter ? FOOTER_HEIGHT : 0;
  const result = `${headerHeight}px 1fr ${footerHeight}px`;
  return result;
};

export const Layout = styled.div<LayoutStyleProps>`
  max-width: 393px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutralBackground};
  display: grid;
  grid-template-rows: ${({ headerOption, footerOption }) =>
    getTemplateRows(headerOption, footerOption)};
  height: 100dvh;
  height: 100dvh;
  outline: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  overflow: hidden;
`;

export const Wrap = styled.div`
  display: grid;
  justify-items: center;
`;

export const Header = styled.div<isHeaderOverlappedType>`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  z-index: 1;
  ${({ isHeaderOverlapped }) => (isHeaderOverlapped ? `border-bottom: 0;` : '')}
`;

export const Contents = styled.div<isHeaderOverlappedType>`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  position: relative;
  ${({ isHeaderOverlapped }) =>
    isHeaderOverlapped ? `margin-top: -${NAVBAR_HEIGHT.top}px` : ''}
`;

export const Footer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  z-index: 1;
`;
