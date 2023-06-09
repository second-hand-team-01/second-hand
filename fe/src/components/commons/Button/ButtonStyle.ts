import { styled, css } from 'styled-components';
import { ButtonStyleProps } from './Button';

const shapes = {
  floating: {
    padding: '10px',
    width: '56px',
    height: '56px',
    borderRadius: '56px',
  },
  large: {
    padding: '16px 20px',
    gap: '4px',
    width: '178px',
    height: '52px',
    borderRadius: '50px',
    fontSize: ({ theme }) => theme.typography.subhead.size,
    lineHeight: ({ theme }) => theme.typography.subhead.lineHeight,
    fontWeight: ({ theme }) => theme.typography.subhead.fontWeight,
  },
  small: {
    padding: '0px 16px',
    width: '63px',
    height: '32px',
    borderRadius: '50px',
    fontSize: ({ theme }) => theme.typography.caption1.size,
    lineHeight: ({ theme }) => theme.typography.caption1.lineHeight,
    fontWeight: ({ theme }) => theme.typography.caption1.fontWeight,
  },
};

const textAlignments = {
  left: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
  },
};

const states = {
  default: {
    backgroundColor: ({ theme }) => theme.colors.neutralBackground,
  },
  active: {
    backgroundColor: ({ theme }) => theme.colors.accentBackgroundPrimary,
    color: ({ theme }) => theme.colors.neutralBackground,
  },
};

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
  ${shapesStyles}
  ${stateStyles}
  ${textAlignStyles}
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const ButtonTitle = styled.span``;
