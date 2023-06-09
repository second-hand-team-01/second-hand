import * as S from './ButtonStyle';
import { Icon } from '@components/Icon/Icon';
import { icons } from '@assets/icons';

export interface ButtonStyleProps {
  title?: string;
  shape: string;
  state: string;
  textAlign: string;
  icon?: keyof typeof icons;
  iconSize?: number;
  iconColor?: string;
}

interface ButtonProps extends ButtonStyleProps {
  onClick?: () => void;
}

export const Button = ({
  title,
  shape,
  state,
  textAlign,
  icon,
  iconSize,
  iconColor,
  onClick,
}: ButtonProps) => {
  return (
    <S.Button
      shape={shape}
      state={state}
      textAlign={textAlign}
      onClick={onClick}
    >
      {title && textAlign === 'left' && <span>{title}</span>}
      {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
      {title && textAlign === 'center' && <span>{title}</span>}
    </S.Button>
  );
};
