import { ReactElement } from 'react';
import * as S from './DropdownStyle';
import { DropdownStyleProps } from './DropdownStyle';
import { Icon } from '@components/commons/index';

interface DropdownProps extends DropdownStyleProps {
  children: ReactElement | string;
  isOpen: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Dropdown = ({
  children,
  isOpen,
  onClick,
  hasBorder,
  size = 'large',
}: DropdownProps) => {
  return (
    <S.Dropdown onClick={onClick} hasBorder={hasBorder} size={size}>
      {children}
      <Icon
        name={isOpen ? 'arrowUp' : 'arrowDown'}
        size={size === 'small' ? 12 : undefined}
      ></Icon>
    </S.Dropdown>
  );
};
