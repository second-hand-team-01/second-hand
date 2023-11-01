import * as S from './IconStyle';
import IconComponents from '@assets/icons';
import { colors, palette } from '@styles/Color';

interface IconProps {
  size?: number;
  name: keyof typeof IconComponents;
  color?: keyof typeof palette | keyof typeof colors;
  iconClickHandler?:
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

export const Icon = ({
  name,
  size = 20,
  color = 'neutralText',
  iconClickHandler,
}: IconProps) => {
  const IconComponent = IconComponents[name];
  return (
    <S.Icon size={size} fill={color} onClick={iconClickHandler}>
      <IconComponent
        id={name}
        fill={colors[color]}
        width={size}
        height={size}
      ></IconComponent>
    </S.Icon>
  );
};
