import * as S from './IconStyle';
import { icons } from '@assets/icons';
import { colors } from '@styles/Color';

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  fill?: string;
}

export const Icon = ({
  name = 'arrowDown',
  size = 16,
  fill = colors.neutralTextStrong,
}: IconProps) => {
  return (
    <S.Icon style={{ fontSize: `${size}px`, color: fill }}>
      {icons[name]}
    </S.Icon>
  );
};

export default Icon;
