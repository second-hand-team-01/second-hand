import { useState } from 'react';
import * as S from './CarouselStyle';
import { SLIDER_HEIGHT } from '@constants/style';
import { getFileNameFromUrl } from '@services/slide/slide';
import { Icon } from '@commons/index';
import { CarouselPageIndicator } from './CarouselPageIndicator/CarouselPageIndicator';

interface CarouselProps {
  urls: string[];
  height?: number;
  width?: number;
}

export const Carousel = ({
  urls,
  height = SLIDER_HEIGHT,
  width = 393,
}: CarouselProps) => {
  const [currentCarousel, setCurrentCarousel] = useState(0);

  const moveCarousel = (direction: 'next' | 'previous') => {
    const totalCarousel = urls.length;
    setCurrentCarousel((prevSlide) => {
      if (direction === 'previous') {
        return prevSlide === 0 ? totalCarousel - 1 : prevSlide - 1;
      }
      return prevSlide === totalCarousel - 1 ? 0 : prevSlide + 1;
    });
  };

  return (
    <S.Carousel height={height} width={width}>
      <S.CarouselContainer
        height={height}
        width={width}
        currentCarousel={currentCarousel}
        imagesCounts={urls.length}
      >
        {urls.map((url) => {
          const fileName = getFileNameFromUrl(url);
          return (
            <S.CarouselImage
              src={url}
              key={fileName}
              alt={fileName}
              height={height}
              width={width}
            />
          );
        })}
      </S.CarouselContainer>
      <CarouselPageIndicator
        imageCounts={urls.length}
        currentIndex={currentCarousel}
      />
      {urls.length >= 2 && (
        <S.CarouselButton
          direction="previous"
          onClick={() => moveCarousel('previous')}
        >
          <Icon size={48} name="chevronLeft" color="systemBackgroundWeak" />
        </S.CarouselButton>
      )}
      {urls.length >= 2 && (
        <S.CarouselButton direction="next" onClick={() => moveCarousel('next')}>
          <Icon size={48} name="chevronRight" color="systemBackgroundWeak" />
        </S.CarouselButton>
      )}
    </S.Carousel>
  );
};
