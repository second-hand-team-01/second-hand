import * as S from './ButtonStyle';
import { Icon } from '@components/commons/Icon/Icon';
import { ButtonStyleProps } from './ButtonStyle';

interface ButtonProps extends ButtonStyleProps {
  onClick?: (e: any) => void;
  onTouchEnd?: (e: any) => void;
  id?: string;
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
  onTouchEnd,
  hasBorderRadius = true,
  hasBorder = false,
  backgroundColor,
  isWidthFitContent = false,
  id,
}: ButtonProps) => {
  return (
    <S.Button
      id={id}
      shape={shape}
      state={state}
      textAlign={textAlign}
      onClick={onClick}
      onTouchStart={onTouchEnd}
      hasBorderRadius={hasBorderRadius}
      hasBorder={hasBorder}
      color={color}
      backgroundColor={backgroundColor}
      isWidthFitContent={isWidthFitContent}
      isIconBtn={!!icon}
    >
      {title && textAlign === 'left' && <span>{title}</span>}
      {icon && <Icon name={icon} size={iconSize} color={color} />}
      {title && textAlign === 'center' && <span>{title}</span>}
    </S.Button>
  );
};
