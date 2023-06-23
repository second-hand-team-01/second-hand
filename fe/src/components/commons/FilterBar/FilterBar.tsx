import * as S from './FilterBarStyle';
import { Button, Dropdown } from '@commons/index';

export const FilterBar = () => {
  return (
    <S.FilterBar>
      <Dropdown isOpen={false} onClick={() => console.log('d')}>
        역삼1동
      </Dropdown>
      <Button icon="hamburger" isWidthFitContent={true} shape="ghost"></Button>
    </S.FilterBar>
  );
};
