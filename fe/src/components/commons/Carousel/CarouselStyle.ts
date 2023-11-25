import styled from 'styled-components';

export interface CarouselStyleProps {
  width?: number;
  height?: number;
}

export interface CarouselContainerStyleProps {
  imagesCounts: number;
  currentCarousel: number;
  width: number;
  height: number;
}

export interface CarouselButtonStyleProps {
  direction: 'previous' | 'next';
}

export const Carousel = styled.div<CarouselStyleProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow-x: hidden;
  position: relative;
`;

export const CarouselContainer = styled.div<CarouselContainerStyleProps>`
  display: flex;
  width: ${({ width, imagesCounts }) => imagesCounts * width}px;
  transform: translateX(
    ${({ currentCarousel, width }) => currentCarousel * width * -1}px
  );
  height: ${({ height }) => height}px;
`;

export const CarouselImage = styled.img`
  object-fit: cover;
`;

export const CarouselButton = styled.div<CarouselButtonStyleProps>`
  position: absolute;
  top: 40%;
  ${({ direction }) => (direction === 'previous' ? 'left: 0;' : 'right: 0;')}
  cursor: pointer;
`;
