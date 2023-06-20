import styled from 'styled-components';
import { colors, palette } from '@styles/Color';

export interface SpinnerStyleProps {
  size: number;
  border: number;
  color: keyof typeof palette | keyof typeof colors;
}

export const Spinner = styled.div<SpinnerStyleProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    margin: 8px;
    border: ${({ border }) => border}px solid
      ${({ theme, color }) => theme.colors[color]};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme, color }) => theme.colors[color]} transparent
      transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
