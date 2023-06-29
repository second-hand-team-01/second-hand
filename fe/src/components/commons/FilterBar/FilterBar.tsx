import * as S from './FilterBarStyle';
import { Button, Dropdown } from '@commons/index';
import { Category } from '@type-store/services/category';

export interface FilterBarProps {
  region?: string;
  handleRegionBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory?: Category;
  handleDeleteBtn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const FilterBar = ({
  region = '',
  handleFilterBtnClick,
  selectedCategory,
  handleDeleteBtn,
  openState,
}: FilterBarProps) => {
  if (!openState) return <></>;

  const [isOpen, setOpen] = openState;
  return (
    <S.FilterBar selectedCategory={selectedCategory}>
      <Dropdown
        menuButtonPropsList={[
          {
            shape: 'small',
            state: 'default',
            name: 'ddd',
            onClick: () => setOpen(false),
          },
          {
            shape: 'small',
            state: 'default',
            name: 'ddd2',
            onClick: () => setOpen(false),
          },
        ]}
        openState={[isOpen, setOpen]}
        onClick={() => setOpen(true)}
      >
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
