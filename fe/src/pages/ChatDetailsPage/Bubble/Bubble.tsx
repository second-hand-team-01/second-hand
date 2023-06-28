import { ReactNode } from 'react';
import * as S from './BubbleStyle';
import { BubbleStyleProps } from './BubbleStyle';

interface BubbleProps {
  type: BubbleStyleProps['type'];
  children: ReactNode;
}

export const Bubble = ({ type, children }: BubbleProps) => {
  return (
    <S.BubbleWrap type={type}>
      <S.Bubble type={type}>{children}</S.Bubble>
    </S.BubbleWrap>
  );
};
