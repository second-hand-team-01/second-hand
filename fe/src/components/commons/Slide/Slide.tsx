import * as S from './SlideStyle';
import { SlideStyleProps } from './SlideStyle';
import { useState, useRef, useEffect } from 'react';
import { SlidePageIndicator } from './SlidePageIndicator/SlidePageIndicator';
import { getFileNameFromUrl } from '@services/slide';

interface SlideProps extends SlideStyleProps {
  urls: string[];
}

export const Slide = ({ urls, height = 491, width = 393 }: SlideProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideShowContainer = useRef<HTMLDivElement | null>(null);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const moveSlide = (direction: 'next' | 'previous') => {
    const totalSlides = urls.length;
    setCurrentSlide((prevSlide) => {
      if (direction === 'previous') {
        return prevSlide === 0 ? totalSlides - 1 : prevSlide - 1;
      }
      return prevSlide === totalSlides - 1 ? 0 : prevSlide + 1;
    });
  };

  const handleTouchStart = ({ targetTouches }) => {
    setTouchStart(targetTouches[0].clientX);
  };

  const handleTouchMove = ({ targetTouches }) => {
    setTouchEnd(targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      moveSlide('next');
    }

    if (touchStart - touchEnd < -150) {
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
  }, [touchStart, touchEnd]);

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
        {urls.map((url, i) => {
          const fileName = getFileNameFromUrl(url);
          return (
            <S.SlideImage
              height={height}
              width={width}
              url={url}
              key={fileName}
              isActive={i === currentSlide}
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
