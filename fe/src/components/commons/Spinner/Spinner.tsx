import * as S from './SpinnerStyle';
import { SpinnerStyleProps } from './SpinnerStyle';

interface SpinnerProps {
  size?: SpinnerStyleProps['size'];
  border?: SpinnerStyleProps['border'];
  color?: SpinnerStyleProps['color'];
}

export const Spinner = ({
  size = 20,
  border = 4,
  color = 'accentBackgroundPrimary',
}: SpinnerProps) => {
  return (
    <>
      <S.Spinner size={size} color={color} border={border}>
        <div />
        <div />
        <div />
        <div />
        <div />
      </S.Spinner>
    </>
  );
};
