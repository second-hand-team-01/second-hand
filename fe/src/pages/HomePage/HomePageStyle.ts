import styled from 'styled-components';
import { FOOTER_HEIGHT, MAX_WIDTH } from '@constants/style';

export const Home = styled.div`
  padding: 0 16px;
  height: 100%;
`;

export const Error = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.subhead.fontWeight};
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  color: ${({ theme }) => theme.colors.neutralTextWeak};
`;

export const FloatingBtn = styled.div`
  position: fixed;
  max-width: ${MAX_WIDTH - 32}px;
  width: 100%;
  bottom: ${FOOTER_HEIGHT + 24}px;
  display: grid;
  justify-content: end;
`;

export const ObserverTarget = styled.div`
  width: 100%;
  height: 3px;
`;
