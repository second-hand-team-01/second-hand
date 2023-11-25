import * as S from './CarouselPageIndicatorStyle';

interface CarouselPageIndicatorProps {
  imageCounts: number;
  currentIndex: number;
}

export const CarouselPageIndicator = ({
  imageCounts,
  currentIndex,
}: CarouselPageIndicatorProps) => {
  const elements = Array.from({ length: imageCounts }).map((_, i) => {
    return { id: i };
  });

  return (
    <S.CarouselPageIndicator>
      {elements.map((element) => (
        <S.Element
          key={element.id}
          className={currentIndex === element.id ? 'active' : ''}
        />
      ))}
    </S.CarouselPageIndicator>
  );
};
