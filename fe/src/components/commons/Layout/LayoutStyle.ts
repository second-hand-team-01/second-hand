import styled from 'styled-components';
import { NavBarProps } from '@commons/NavBar/NavBar';
import { NAVBAR_HEIGHT, FOOTER_HEIGHT } from '@constants/style';

export interface HeaderProps {
  type: 'filter' | 'nav';
  navbarOptions?: NavBarProps;
}

export interface FooterProps {
  type: 'info' | 'chat' | 'tab' | undefined;
}

export interface LayoutStyleProps {
  headerOption?: HeaderProps;
  footerOption?: FooterProps;
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
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.neutralBackground};
  border-left: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  border-right: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  display: grid;
  grid-template-rows: ${({ headerOption, footerOption }) =>
    getTemplateRows(headerOption, footerOption)};
  height: 100vh;
`;

export const Wrap = styled.div`
  display: grid;
  justify-items: center;
`;

export const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
`;

export const Contents = styled.div`
  overflow-y: scroll;
  width: 100%;
  position: relative;
`;

export const Footer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.neutralBorder};
`;
