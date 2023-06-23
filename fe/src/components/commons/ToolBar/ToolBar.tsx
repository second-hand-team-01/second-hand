import { Button } from '@commons/Button/Button';
import * as S from './ToolBarStyle';

export const ToolBar = () => {
  return (
    <S.ToolBar>
      <Button
        title={'지역명'}
        icon="filter"
        shape="small"
        color="neutralText"
      ></Button>
    </S.ToolBar>
  );
};
