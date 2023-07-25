import * as S from './FilterBarStyle';
import { Button, Dropdown } from '@commons/index';
import { Category } from '@type-store/services/category';
import { MenuButtonProps } from '@components/commons/Menu/MenuStyle';
import { useState, useEffect } from 'react';


export interface FilterBarProps {
  mainLocation?: string;
  subLocation?: string;
  region?: string;
  handleRegionBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory?: Category;
  handleDeleteBtn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  locationPopupHandler?: any;
}

export const FilterBar = ({
  region = '',
  handleFilterBtnClick,
  selectedCategory,
  handleDeleteBtn,
  openState,
  mainLocation,
  subLocation,
  locationPopupHandler,
}: FilterBarProps) => {
  if (!openState) return <></>;

  const [isOpen, setOpen] = openState;

  const [menuButtonPropsList, setMenuButtonPropsList] = useState<
    MenuButtonProps[]
  >([
    {
      shape: 'small',
      state: 'default',
      name: mainLocation,
      onClick: () => setOpen(false),
    },

    {
      shape: 'small',
      state: 'default',
      name: '내동네 설정하기',
      onClick: () => locationPopupHandler(),
    },
  ]);

  useEffect(() => {
    const newMenu: MenuButtonProps = {
      shape: 'small',
      state: 'default',
      name: subLocation,
      onClick: () => () => setOpen(false),
    };
    if (subLocation) {
      setMenuButtonPropsList((prev) => [prev[0], newMenu, prev[1]]);
    }
  }, [subLocation]);

  return (
    <S.FilterBar selectedCategory={selectedCategory}>
      <Dropdown
        menuButtonPropsList={menuButtonPropsList}
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
