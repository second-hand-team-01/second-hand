import * as S from './IconStyle';
import { icons } from '@assets/icons';
import { IconStyleProps } from './IconStyle';

interface IconProps extends IconStyleProps {
  name: keyof typeof icons;
}

export const Icon = ({ name, size = 16, color = 'neutralText' }: IconProps) => {
  return (
    <S.Icon size={size} color={color}>
      {icons[name]}
    </S.Icon>
  );
};
