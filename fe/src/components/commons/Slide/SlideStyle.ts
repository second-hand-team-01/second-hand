import { RefObject } from 'react';
import styled from 'styled-components';

export interface SlideStyleProps {
  imagesCounts?: number;
  ref?: RefObject<HTMLDivElement | null>;
  width?: number;
  height?: number;
}

export interface SlideContainerStyleProps {
  imagesCounts: number;
  currentSlide: number;
  width: number;
  height: number;
}

export const Slide = styled.div<SlideStyleProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow-x: hidden;
  position: relative;
`;

export const SlideContainer = styled.div<SlideContainerStyleProps>`
  display: flex;
  width: ${({ width, imagesCounts }) => imagesCounts * width}px;
  transform: translateX(
    ${({ currentSlide, width }) => currentSlide * width * -1}px
  );
  height: ${({ height }) => height}px;
`;

export const SlideImage = styled.img`
  object-fit: cover;
`;
