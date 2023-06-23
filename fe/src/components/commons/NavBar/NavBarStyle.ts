import styled from 'styled-components';
import { NAVBAR_HEIGHT } from '@constants/style';

interface HeaderStyleProps {
  isTransparent?: boolean;
}

export const Header = styled.div<HeaderStyleProps>`
  width: 100%;
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

export const HeaderBottom = styled.div`
  padding: 0 16px;
  height: ${NAVBAR_HEIGHT.bottom}px;
  display: grid;
  align-items: center;
  justify-content: center;
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
