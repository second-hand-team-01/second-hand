import styled from 'styled-components';
import { IconStyleProps } from './Icon';

export const Icon = styled.div<IconStyleProps>`
  font-family: SF Pro;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutralText};
`;
