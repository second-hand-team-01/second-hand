import styled, { css } from 'styled-components';
import { fontWeights } from '@styles/Typography';
import { colors } from '@styles/Color';

export interface MenuStyleProps {
  location: 'top' | 'bottom';
  parentHeight?: number;
}

export interface MenuButtonProps {
  shape: 'large' | 'small';
  state: 'default' | 'active';
  color?: keyof typeof colors;
  fontWeight?: keyof typeof fontWeights;
  name?: string;
  onClick?: () => void;
}

// TODO : 동네 설정 메뉴 absolute 값 지정 필요
const locations = {
  top: css<MenuStyleProps>`
    position: absolute;
    width: 240px;
    border: 1px solid ${({ theme }) => theme.colors.neutralBorderStrong};
    border-radius: 12px;
  `,
  bottom: css<MenuStyleProps>`
    position: fixed;
    bottom: 0;
    max-width: 393px;
    width: 100%;
  `,
};

const shapes = {
  large: css<MenuButtonProps>`
    ${({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 61px;
    font-size: ${theme.typography.title3.size};
    line-height: ${theme.typography.title3.lineHeight};
    font-weight: ${theme.fontWeights.light};
    color: ${theme.colors.systemDefault};
    border: none;
    border-bottom: 0.5px solid ${theme.colors.neutralBorderStrong};
    `},
  `,
  small: css<MenuButtonProps>`
    ${({ theme }) => `
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 0 0 0 20px;
  font-size: ${theme.typography.subhead.size};
  line-height: ${theme.typography.caption1.lineHeight};
  font-weight: ${theme.fontWeights.light}; 
  border: none;
  border-bottom: 0.3px solid ${theme.colors.neutralBorderStrong};
  `},
  `,
};

const states = {
  default: css<MenuButtonProps>`
    ${({ theme }) => `
  background-color: ${theme.colors.neutralBackground};
  `},
  `,
  active: css<MenuButtonProps>`
    ${({ theme }) => `
  background-color: ${theme.colors.systemBackgroundWeak};
  `},
  `,
};

const locationStyles = css<MenuStyleProps>`
  ${({ location }) =>
    location &&
    locations[location] &&
    css`
      ${locations[location]}
    `}
`;

const shapeStyles = css<MenuButtonProps>`
  ${({ shape }) =>
    shape &&
    shapes[shape] &&
    css`
      ${shapes[shape]}
    `}
`;

const stateStyles = css<MenuButtonProps>`
  ${({ state }) =>
    state &&
    states[state] &&
    css`
      ${states[state]}
    `}
`;

export const BackDrop = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 393px;
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.neutralOverlay};
`;

export const Menu = styled.div<MenuStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  ${locationStyles}
  ${({ parentHeight }) =>
    parentHeight ? `top: calc(${parentHeight}px + 4px)` : 'top:4px'};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-radius: 13px;

  & > :first-child {
    border-radius: 13px 13px 0 0;
  }

  & > :last-child {
    border-radius: 0 0 13px 13px;
    border-bottom: none;
  }

  & > :only-child {
    border-radius: 13px;
  }
`;

export const MenuButton = styled.button<MenuButtonProps>`
  ${shapeStyles};
  ${stateStyles};
  ${({ color, theme }) => (color ? `color: ${theme.colors[color]}` : '')};
  ${({ fontWeight, theme }) =>
    fontWeight ? `font-weight: ${theme.fontWeights[fontWeight]}` : ''};
  cursor: pointer;
`;
