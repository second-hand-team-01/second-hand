import styled from 'styled-components';
import { NAVBAR_HEIGHT, MAX_WIDTH } from '@constants/style';

interface HeaderStyleProps {
  isTransparent?: boolean;
}

interface HeaderBottomStyleProps {
  hasTab?: boolean;
  hasCategory?: boolean;
}

export const Header = styled.div<HeaderStyleProps>`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  ${({ isTransparent }) =>
    isTransparent
      ? `
      border-bottom: 0;
      background-color: transparent;
      background: linear-gradient(180deg, rgba(60, 60, 67, 0.20) 0%, rgba(60, 60, 67, 0.00) 100%);`
      : ''};
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${NAVBAR_HEIGHT.top}px;
  padding: 0 16px;
`;

export const HeaderBottom = styled.div<HeaderBottomStyleProps>`
  padding: 0 16px;
  height: ${NAVBAR_HEIGHT.bottom}px;
  width: 100%;
  overflow-x: scroll;
  align-items: center;
`;

export const TabContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const CategoryContainer = styled.div`
  width: max-content;
  display: flex;
  gap: 4px;
`;

export const ButtonContainer = styled.div`
  width: 130px;
  &:last-child {
    display: grid;
    justify-items: end;
  }
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.body.size};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
