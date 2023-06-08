import styled from 'styled-components';

interface IconProps {
  size: number;
  fill: string;
}

export const Icon = styled.div<IconProps>`
  font-family: SF Pro;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
`;
