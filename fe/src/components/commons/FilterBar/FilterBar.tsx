import * as S from './FilterBarStyle';
import { Button, Dropdown } from '@commons/index';
import { Category } from '@type-store/services/category';
import { MenuButtonProps } from '@components/commons/Menu/MenuStyle';
import { Location } from '@stores/UserContext';

export interface FilterBarProps {
  mainLocation?: Location | null;
  subLocation?: Location | null;
  region?: string | null;
  handleRegionBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory?: Category;
  handleDeleteBtn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  locationPopupHandler?: () => void;
  locationDropdownClickHandler?: (locationIdx, town) => void;
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
  locationDropdownClickHandler,
}: FilterBarProps) => {
  if (!openState) return <></>;

  const [isDropdownOpen, setDropdownOpen] = openState;

  const menuButtonPropsList: MenuButtonProps[] = [
    {
      shape: 'small',
      state: 'default',
      name: mainLocation?.town,
      onClick: () =>
        locationDropdownClickHandler &&
        locationDropdownClickHandler(
          mainLocation?.locationIdx,
          mainLocation?.town
        ),
    },
    ...(subLocation
      ? [
          {
            shape: 'small',
            state: 'default',
            name: subLocation?.town,
            onClick: () =>
              locationDropdownClickHandler &&
              locationDropdownClickHandler(
                subLocation?.locationIdx,
                subLocation?.town
              ),
          } as MenuButtonProps,
        ]
      : []),
    {
      shape: 'small',
      state: 'default',
      name: '내동네 설정하기',
      onClick: locationPopupHandler,
    },
  ];

  return (
    <S.FilterBar selectedCategory={selectedCategory}>
      <Dropdown
        menuButtonPropsList={menuButtonPropsList}
        openState={[isDropdownOpen, setDropdownOpen]}
        onClick={() => setDropdownOpen(true)}
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
