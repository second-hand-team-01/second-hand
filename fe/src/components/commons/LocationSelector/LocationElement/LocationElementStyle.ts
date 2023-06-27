import styled from 'styled-components';

export const LocationElementList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const LocationElement = styled.li``;

export const CategorySection = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  padding-bottom: 16px;
  justify-content: space-between;
`;

export const CategoryContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const PriceSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  padding-top: 4px;
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.subhead.size};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  color: ${({ theme }) => theme.colors.neutralText};
`;

export const Contents = styled.div`
  margin: 16px 0;
`;

export const CategoryList = styled.li`
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

export const CategoryListInner = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutralText};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
`;
