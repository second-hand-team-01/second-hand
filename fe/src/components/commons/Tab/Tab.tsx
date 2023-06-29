import * as S from './TabStyle';

interface OptionType {
  name: string;
  id: string;
}

export interface TabProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  activeId: string;
  options: OptionType[];
}

export const Tab = ({ onClick, activeId, options }: TabProps) => {
  return (
    <S.Wrap>
      {options.map((option) => (
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
