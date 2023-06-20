import styled from 'styled-components';
import { NAVBAR_HEIGHT } from '@constants/style';

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  width: 100%;
  border-radius: 14px 14px 0px 0px;
  background-color: white;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${NAVBAR_HEIGHT.top}px;
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
