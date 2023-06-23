import styled from 'styled-components';
import { NAVBAR_HEIGHT } from '@constants/style';

export const FilterBar = styled.div`
  height: ${NAVBAR_HEIGHT.top}px;
  display: grid;
  align-items: center;
  justify-items: stretch;
  padding: 0 16px 0;
  grid-template-columns: 1fr max-content;
  justify-content: space-between;
`;
