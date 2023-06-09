import * as S from './TabBarStyle';
import { Icon } from '@components/Icon/Icon';
import { icons } from '@assets/icons';

export interface TabBarStyleProps {
  title: string;
  name: string;
  icon: keyof typeof icons;
  iconSize?: number;
  iconColor?: string;
}

interface TabBarProps extends TabBarStyleProps {
  onClick?: () => void;
}

export const TabBar = ({
  title,
  icon,
  iconSize,
  iconColor,
  onClick,
}: TabBarProps) => {
  return (
    <S.TabBar onClick={onClick}>
      <Icon name={icon} size={iconSize} color={iconColor} />
      <span>{title}</span>
    </S.TabBar>
  );
};
