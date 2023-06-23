import { Spinner } from '@commons/index';
import * as S from './LoadingStyle';
import { LoadingStyleProps } from './LoadingStyle';

export const Loading = ({ height = '100%' }: LoadingStyleProps) => {
  return (
    <S.Loading height={height}>
      <Spinner></Spinner>
    </S.Loading>
  );
};
