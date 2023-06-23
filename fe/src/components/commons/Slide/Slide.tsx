import * as S from './SlideStyle';
import { SlideStyleProps } from './SlideStyle';
import { useState, useRef, useEffect } from 'react';
import { SlidePageIndicator } from './SlidePageIndicator/SlidePageIndicator';
import { getFileNameFromUrl } from '@services/slide/slide';
import { SLIDER_HEIGHT } from '@constants/style';

interface SlideProps extends SlideStyleProps {
  urls: string[];
}

export const Slide = ({
  urls,
  height = SLIDER_HEIGHT,
  width = 393,
}: SlideProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideShowContainer = useRef<HTMLDivElement | null>(null);

  let touchStart = 0;
  let touchEnd = 0;
  const threshold = 80;

  const moveSlide = (direction: 'next' | 'previous') => {
    const totalSlides = urls.length;
    setCurrentSlide((prevSlide) => {
      if (direction === 'previous') {
        return prevSlide === 0 ? totalSlides - 1 : prevSlide - 1;
      }
      return prevSlide === totalSlides - 1 ? 0 : prevSlide + 1;
    });
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    touchStart = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEnd = e.targetTouches[0].clientX;
    if (Math.abs(touchStart - touchEnd) > threshold) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart - touchEnd > threshold) {
      e.preventDefault();
      moveSlide('next');
    }

    if (touchStart - touchEnd < -threshold) {
      e.preventDefault();
      moveSlide('previous');
    }
  };

  useEffect(() => {
    const slideContainer = slideShowContainer.current;

    if (slideContainer) {
      slideContainer.addEventListener('touchstart', handleTouchStart);
      slideContainer.addEventListener('touchmove', handleTouchMove);
      slideContainer.addEventListener('touchend', handleTouchEnd);

      return () => {
        slideContainer.removeEventListener('touchstart', handleTouchStart);
        slideContainer.removeEventListener('touchmove', handleTouchMove);
        slideContainer.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentSlide]);

  return (
    <S.Slide
      height={height}
      width={width}
      imagesCounts={urls.length}
      ref={slideShowContainer}
    >
      <S.SlideContainer
        height={height}
        width={width}
        imagesCounts={urls.length}
        currentSlide={currentSlide}
      >
        {urls.map((url) => {
          const fileName = getFileNameFromUrl(url);
          return (
            <S.SlideImage
              src={url}
              width={width}
              height={height}
              key={fileName}
              alt={fileName}
            ></S.SlideImage>
          );
        })}
      </S.SlideContainer>
      <SlidePageIndicator
        imageCounts={urls.length}
        currentIndex={currentSlide}
      ></SlidePageIndicator>
    </S.Slide>
  );
};
