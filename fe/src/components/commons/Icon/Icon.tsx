import * as S from './IconStyle';
import { icons } from '@assets/icons';

export interface IconStyleProps {
  size?: number;
  color?: string;
}

interface IconProps extends IconStyleProps {
  name: keyof typeof icons;
}

export const Icon = ({ name = 'arrowDown', size = 16, color }: IconProps) => {
  return (
    <S.Icon size={size} color={color}>
      {icons[name]}
    </S.Icon>
  );
};
