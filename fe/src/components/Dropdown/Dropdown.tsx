import { ReactElement } from 'react';
import * as S from './DropdownStyle';
import { Icon } from '@components/index';

interface DropdownProps {
  children: ReactElement | string;
  onClick: () => void;
}

export const Dropdown = ({ children, onClick }: DropdownProps) => {
  return (
    <S.Dropdown onClick={onClick}>
      {children}
      <Icon name="arrowDown"></Icon>
    </S.Dropdown>
  );
};
