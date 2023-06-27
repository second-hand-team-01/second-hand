import styled from 'styled-components';

export const LocationSelectorStyle = styled.div`
  padding: 40px 0;
`;

export const LocationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  row-gap: 32px;
  font-size: ${({ theme }) => theme.typography.footnote.size};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: ${({ theme }) => theme.typography.footnote.lineHeight};
`;
