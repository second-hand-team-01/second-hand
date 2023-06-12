import * as S from './ButtonStyle';
import { Icon } from '@components/commons/Icon/Icon';
import { ButtonStyleProps } from './ButtonStyle';

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
