import { useState } from 'react';
import * as S from './MenuStyle';
import { MenuStyleProps, MenuButtonProps } from './MenuStyle';
import { Portal } from '@components/commons';

interface MenuProps extends MenuStyleProps {
  menuButtonPropsList: MenuButtonProps[];
  onClick?: () => void;
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

// TODO: props로 받은 onClick을 MenuButton에 전달해야 함

export const Menu = ({
  location,
  menuButtonPropsList,
  parentHeight,
  openState,
}: MenuProps) => {
  const [isOpen, setIsOpen] = openState;
  console.log('menu', isOpen);

  const backDropHandler = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLElement>) => {
    if (target === currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Portal id="modal-root">
      {location === 'bottom' && <S.BackDrop onClick={backDropHandler} />}
      <S.Menu location={location} parentHeight={parentHeight}>
        <S.ButtonContainer>
          {menuButtonPropsList.map((props) => (
            <S.MenuButton key={props.name} {...props}>
              {props.name}
            </S.MenuButton>
          ))}
        </S.ButtonContainer>
        {location === 'bottom' && (
          <S.ButtonContainer>
            <S.MenuButton
              shape="large"
              state="default"
              fontWeight="semibold"
              onClick={() => setIsOpen(false)}
            >
              취소
            </S.MenuButton>
          </S.ButtonContainer>
        )}
      </S.Menu>
    </Portal>
  );
};
