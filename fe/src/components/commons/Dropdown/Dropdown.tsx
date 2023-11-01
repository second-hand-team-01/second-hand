import { ReactElement, useEffect, useRef, useState } from 'react';
import * as S from './DropdownStyle';
import { DropdownStyleProps } from './DropdownStyle';
import { Icon, Menu } from '@commons/index';
import { ParentCoordinate, MenuButtonProps } from '@commons/Menu/MenuStyle';

interface DropdownProps extends DropdownStyleProps {
  children: ReactElement | string | null;
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  menuButtonPropsList: MenuButtonProps[];
}

export const Dropdown = ({
  children,
  openState,
  onClick,
  hasBorder,
  size = 'large',
  menuButtonPropsList,
}: DropdownProps) => {
  const [isOpen] = openState;
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [parentCoordinate, setParentCoordinate] = useState<ParentCoordinate>({
    height: 0,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const rect = dropdownRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { top, height, x } = rect;
    setParentCoordinate({ top, left: x, height });
  }, [dropdownRef.current]);

  return (
    <>
      <S.Dropdown
        ref={dropdownRef}
        onClick={onClick}
        hasBorder={hasBorder}
        size={size}
      >
        {children}
        <Icon
          name={isOpen ? 'arrowUp' : 'arrowDown'}
          size={size === 'small' ? 12 : undefined}
        ></Icon>
      </S.Dropdown>
      {isOpen ? (
        <Menu
          location="top"
          menuButtonPropsList={menuButtonPropsList}
          openState={openState}
          parentCoordinate={parentCoordinate}
        ></Menu>
      ) : (
        <></>
      )}
    </>
  );
};
