import * as S from './FilterBarStyle';
import { Button, Dropdown } from '@commons/index';

export interface FilterBarProps {
  region?: string;
  handleRegionBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilterBar = ({
  region = '',
  handleRegionBtnClick,
  handleFilterBtnClick,
}: FilterBarProps) => {
  return (
    <S.FilterBar>
      <Dropdown isOpen={false} onClick={handleRegionBtnClick}>
        {region}
      </Dropdown>
      <Button
        icon="hamburger"
        isWidthFitContent={true}
        shape="ghost"
        onClick={handleFilterBtnClick}
      ></Button>
    </S.FilterBar>
  );
};
