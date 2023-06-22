import * as S from './ButtonStyle';
import { Icon } from '@components/commons/Icon/Icon';
import { ButtonStyleProps } from './ButtonStyle';

interface ButtonProps extends ButtonStyleProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  hasBorderRadius = true,
  hasBorder = false,
  backgroundColor,
  isWidthFitContent = false,
}: ButtonProps) => {
  return (
    <S.Button
      shape={shape}
      state={state}
      textAlign={textAlign}
      onClick={onClick}
      hasBorderRadius={hasBorderRadius}
      hasBorder={hasBorder}
      color={color}
      backgroundColor={backgroundColor}
      isWidthFitContent={isWidthFitContent}
    >
      {title && textAlign === 'left' && <span>{title}</span>}
      {icon && <Icon name={icon} size={iconSize} color={color} />}
      {title && textAlign === 'center' && <span>{title}</span>}
    </S.Button>
  );
};
