import * as S from './ButtonStyle';
import { Icon } from '@components/commons/Icon/Icon';
import { ButtonStyleProps } from './ButtonStyle';

interface ButtonProps extends ButtonStyleProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onTouchEnd?: (e: React.TouchEvent<HTMLButtonElement>) => void;
  iconClickHandler?:
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  id?: string;
}

export const Button = ({
  title,
  shape = 'large',
  state = 'default',
  textAlign = 'center',
  icon,
  iconRight,
  color,
  iconSize,
  onClick,
  onTouchEnd,
  iconClickHandler,
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
      {icon && (
        <Icon
          name={icon}
          size={iconSize}
          color={color}
          iconClickHandler={iconClickHandler}
        />
      )}
      {title && textAlign === 'center' && <span>{title}</span>}
      {iconRight && <Icon name={iconRight} size={iconSize} color={color} />}
    </S.Button>
  );
};
