import * as S from './FilterBarStyle';
import { Button, Dropdown } from '@commons/index';
import { Category } from '@type-store/services/category';

export interface FilterBarProps {
  region?: string;
  handleRegionBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory?: Category;
  handleDeleteBtn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilterBar = ({
  region = '',
  handleRegionBtnClick,
  handleFilterBtnClick,
  selectedCategory,
  handleDeleteBtn,
}: FilterBarProps) => {
  return (
    <S.FilterBar selectedCategory={selectedCategory}>
      <Dropdown isOpen={false} onClick={handleRegionBtnClick}>
        {region}
      </Dropdown>
      <Button
        icon="hamburger"
        isWidthFitContent={true}
        shape="ghost"
        onClick={handleFilterBtnClick}
        color="neutralText"
      ></Button>
      {selectedCategory && (
        <Button
          title={selectedCategory?.text}
          state={'active'}
          hasBorder={true}
          shape="small"
          iconRight="close"
          color="accentText"
          onClick={handleDeleteBtn}
        ></Button>
      )}
    </S.FilterBar>
  );
};
