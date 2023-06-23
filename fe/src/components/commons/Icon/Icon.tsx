import * as S from './IconStyle';
import IconComponents from '@assets/icons';
import { colors, palette } from '@styles/Color';

interface IconProps {
  size?: number;
  name: keyof typeof IconComponents;
  color?: keyof typeof palette | keyof typeof colors;
}

export const Icon = ({ name, size = 20, color = 'neutralText' }: IconProps) => {
  const IconComponent = IconComponents[name];
  return (
    <S.Icon size={size} fill={color}>
      <IconComponent
        fill={colors[color]}
        width={size}
        height={size}
      ></IconComponent>
    </S.Icon>
  );
};
