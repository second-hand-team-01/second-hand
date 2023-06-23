import styled, { css } from 'styled-components';
import icons from '@assets/icons/index';
import { colors, palette } from '@styles/Color';

const shapes = {
  floating: css<ButtonStyleProps>`
    ${({ theme }) => `
      padding: 10px;
      width: 56px;
      height: 56px;
      border-radius: 56px;
      background-color: ${theme.colors.accentBackgroundPrimary};
    `}
  `,
  large: css<ButtonStyleProps>`
    ${({ theme }) => `
      padding: 16px 20px;
      gap: 4px;
      width: 100%;
      height: 52px;
      border-radius: 50px;
      font-size: ${theme.typography.subhead.size};
      line-height: ${theme.typography.subhead.lineHeight};
      font-weight: ${theme.typography.subhead.fontWeight};
    `}
  `,
  medium: css<ButtonStyleProps>`
    ${({ theme }) => `
      padding: 0px 16px;
      width: fit-content;
      height: 32px;
      border-radius: 50px;
      font-size: ${theme.typography.body.size};
      line-height: ${theme.typography.body.lineHeight};
      font-weight: ${theme.typography.body.fontWeight};
    `}
  `,
  small: css<ButtonStyleProps>`
    ${({ theme }) => `
      padding: 0px 16px;
      width: fit-content;
      height: 32px;
      border-radius: 50px;
      font-size: ${theme.typography.caption1.size};
      line-height: ${theme.typography.caption1.lineHeight};
      font-weight: ${theme.typography.caption1.fontWeight};
    `}
  `,
  ghost: css<ButtonStyleProps>`
    ${({ theme }) => `
      padding: 4px 8px;
      width: fit-content;
      font-size: ${theme.typography.subhead.size};
      line-height: ${theme.typography.subhead.lineHeight};
      font-weight: ${theme.typography.subhead.fontWeight};
      background-color: transparent;
      color: ${theme.colors.accentText};
      border-radius: 100%;
    `}
  `,
};

const textAlignments = {
  left: css`
    justify-content: space-between;
  `,
  center: css`
    justify-content: center;
  `,
};

const states = {
  default: css`
    background-color: ${({ theme }) => theme.colors.neutralBackground};
    color: ${({ theme }) => theme.colors.neutralText};
  `,
  active: css`
    background-color: ${({ theme }) => theme.colors.accentBackgroundPrimary};
    color: ${({ theme }) => theme.colors.accentText};
  `,
  disabled: css`
    background-color: ${({ theme }) => theme.colors.accentBackgroundPrimary};
    color: ${({ theme }) => theme.colors.neutralBackground};
    opacity: 0.5;
    pointer-events: none;
  `,
};

export interface ButtonStyleProps {
  title?: string;
  shape?: keyof typeof shapes;
  state?: keyof typeof states;
  textAlign?: keyof typeof textAlignments;
  icon?: keyof typeof icons;
  iconSize?: number;
  color?: keyof typeof palette | keyof typeof colors;
  hasBorderRadius?: boolean;
  hasBorder?: boolean;
  backgroundColor?: keyof typeof palette | keyof typeof colors | string;
  isWidthFitContent?: boolean;
  isIconBtn?: boolean;
}

const shapesStyles = css<ButtonStyleProps>`
  ${({ shape }) =>
    shape &&
    shapes[shape] &&
    css`
      ${shapes[shape]}
    `}
`;

const stateStyles = css<ButtonStyleProps>`
  ${({ state }) =>
    state &&
    states[state] &&
    css`
      ${states[state]}
    `}
`;

const textAlignStyles = css<ButtonStyleProps>`
  ${({ textAlign }) =>
    textAlign &&
    textAlignments[textAlign] &&
    css`
      ${textAlignments[textAlign]}
    `}
`;

export const Button = styled.button<ButtonStyleProps>`
  ${stateStyles}
  ${shapesStyles}
  ${textAlignStyles}
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  ${({ color, theme }) => (color ? `color: ${theme.colors[color]}` : '')};
  ${({ hasBorder, theme }) =>
    hasBorder ? `border: 1px solid  ${theme.colors.neutralBorder}` : ''}
  ${({ backgroundColor, theme }) =>
    backgroundColor
      ? `background-color: ${
          theme.colors[backgroundColor] ??
          theme.palette[backgroundColor] ??
          backgroundColor
        }`
      : ''};
  display: flex;
  gap: 4px;
  ${({ isWidthFitContent }) =>
    isWidthFitContent ? `width: max-content;` : ''};
  ${({ isIconBtn }) => (isIconBtn ? 'padding: 4px;' : '')};
`;
