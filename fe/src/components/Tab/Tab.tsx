import { ReactElement } from 'react';
import * as S from './TabStyle';
import { Icon } from '@components/index';

interface OptionType {
  name: string;
  id: string;
}

interface TabProps {
  children: ReactElement | string;
  onClick: () => void;
  activeId: string;
  options: OptionType[];
}

export const Tab = ({ children, onClick, activeId, options }: TabProps) => {
  return (
    <S.Wrap>
      {options?.map((option) => (
        <S.Tab
          key={option.id}
          onClick={onClick}
          id={option.id}
          className={activeId === option.id ? 'active' : ''}
        >
          {option.name}
        </S.Tab>
      ))}
    </S.Wrap>
  );
};
