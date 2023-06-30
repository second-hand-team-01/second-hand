import styled from 'styled-components';

export const LocationList = styled.li`
  height: 52px;
  font-size: ${({ theme }) => theme.typography.subhead.size};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  margin: 0 -16px;
  padding: 0 16px;
  cursor: pointer;
  list-style-type: none;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.neutralBackgroundWeak};
  }
  &:last-child {
    border-bottom: 0;
  }
`;

export const LocationListInner = styled.div<{ color: string }>`
  height: 100%;
  display: grid;
  align-items: center;
  ${({ color, theme }) => color && `color: ${theme.colors[color]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
`;
