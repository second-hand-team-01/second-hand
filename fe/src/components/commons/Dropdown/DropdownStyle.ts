import styled from 'styled-components';

export interface DropdownStyleProps {
  hasBorder?: boolean;
  size?: 'large' | 'small';
}

export const Dropdown = styled.button<DropdownStyleProps>`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: auto auto;
  gap: 4px;
  width: fit-content;
  font-weight: ${({ theme }) => theme.typography.headline.fontWeight};
  font-size: ${({ theme }) => theme.typography.headline.size};
  line-height: ${({ theme }) => theme.typography.headline.lineHeight};
  border-radius: 8px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  ${({ theme, hasBorder }) =>
    hasBorder
      ? `
    border: 1px solid ${theme.colors.neutralBorder};
    padding: 8px 12px;`
      : ''}
  ${({ theme, size }) =>
    size === 'small'
      ? `font-weight: ${theme.typography.caption1.fontWeight};
      font-size: ${theme.typography.caption1.size};
      line-height: ${theme.typography.caption1.lineHeight};
      border-radius: 6px;`
      : ''}
`;
