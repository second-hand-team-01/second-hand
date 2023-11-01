import { Button } from '@commons/Button/Button';
import * as S from './ToolBarStyle';

export interface ToolBarProps {
  title?: string | null | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ToolBar = ({ title, onClick }: ToolBarProps) => {
  return (
    <S.ToolBar>
      <Button
        title={title}
        icon="filter"
        shape="small"
        color="neutralText"
        onClick={onClick}
      ></Button>
    </S.ToolBar>
  );
};
