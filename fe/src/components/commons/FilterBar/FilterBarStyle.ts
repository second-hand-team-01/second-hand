import styled from 'styled-components';
import { NAVBAR_HEIGHT } from '@constants/style';
import { Category } from '@type-store/services/category';

interface FilterBarStyleProps {
  selectedCategory?: Category;
}

export const FilterBar = styled.div<FilterBarStyleProps>`
  display: grid;
  align-items: center;
  justify-items: stretch;
  padding: 0 16px 0;
  grid-template-columns: 1fr max-content;
  justify-content: space-between;

  height: max-content;
  min-height: ${NAVBAR_HEIGHT.top}px;

  ${({ selectedCategory }) =>
    selectedCategory
      ? `
      grid-template-rows: ${NAVBAR_HEIGHT.top}px max-content;
      padding-bottom: 8px;`
      : ''}
`;

export const FilterContainer = styled.div`
  display: flex;
`;
