import * as S from './ButtonStyle';
import { Icon } from '@components/commons/Icon/Icon';
import { ButtonStyleProps } from './ButtonStyle';

interface ButtonProps extends ButtonStyleProps {
  onClick?: () => void;
}

export const Button = ({
  title,
  shape = 'large',
  state = 'default',
  textAlign = 'center',
  icon,
  color,
  iconSize,
  onClick,
}: ButtonProps) => {
  return (
    <S.Button
      shape={shape}
      state={state}
      textAlign={textAlign}
      onClick={onClick}
      color={color}
    >
      {title && textAlign === 'left' && <span>{title}</span>}
      {icon && <Icon name={icon} size={iconSize} color={color} />}
      {title && textAlign === 'center' && <span>{title}</span>}
    </S.Button>
  );
};
