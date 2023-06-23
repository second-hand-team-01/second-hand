import styled from 'styled-components';
import { colors, palette } from '@styles/Color';

export interface IconStyleProps {
  size?: number;
  fill?: keyof typeof palette | keyof typeof colors;
}

export const Icon = styled.div<IconStyleProps>`
  font-family: 'SF Pro', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
`;
