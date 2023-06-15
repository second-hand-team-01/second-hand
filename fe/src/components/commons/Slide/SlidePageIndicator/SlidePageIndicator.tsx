import * as S from './SlidePageIndicatorStyle';

interface SlidePageIndicatorProps {
  imageCounts: number;
  currentIndex: number;
}

export const SlidePageIndicator = ({
  imageCounts,
  currentIndex,
}: SlidePageIndicatorProps) => {
  const elements = Array.from({ length: imageCounts }).map((_, i) => {
    return { id: i };
  });
  return (
    <S.SlidePageIndicator>
      {elements.map((element) => (
        <S.Element
          key={element.id}
          className={currentIndex === element.id ? 'active' : ''}
        ></S.Element>
      ))}
    </S.SlidePageIndicator>
  );
};
