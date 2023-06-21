import styled from 'styled-components';

export const WritePage = styled.div`
  padding: 0 16px;
`;

export const TitleSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  margin-top: 16px;
  padding-top: 4px;
`;

export const CategorySection = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  padding-bottom: 16px;
  justify-content: space-between;
`;

export const CategoryContainer = styled.div`
  display: flex;
`;

export const PriceSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  padding-top: 4px;
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr;
  gap: 4px;
`;
