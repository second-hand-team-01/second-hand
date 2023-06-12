import { ReactElement } from 'react';
import * as S from './DropdownStyle';
import { Icon } from '@components/commons/index';

interface DropdownProps {
  children: ReactElement | string;
  isOpen: boolean;
  onClick: () => void;
}

export const Dropdown = ({ children, isOpen, onClick }: DropdownProps) => {
  return (
    <S.Dropdown onClick={onClick}>
      {children}
      <Icon name={isOpen ? 'arrowUp' : 'arrowDown'}></Icon>
    </S.Dropdown>
  );
};
