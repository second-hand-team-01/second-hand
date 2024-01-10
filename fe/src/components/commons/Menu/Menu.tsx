import * as S from './MenuStyle';
import { MenuStyleProps, MenuButtonProps } from './MenuStyle';
import { Portal } from '@components/commons';

interface MenuProps extends MenuStyleProps {
  menuButtonPropsList: MenuButtonProps[];
  onClick?: () => void;
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const Menu = ({
  location,
  menuButtonPropsList,
  parentCoordinate,
  openState,
}: MenuProps) => {
  const [isOpen, setIsOpen] = openState;

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
    <Portal id="dropdown-root">
      <S.BackDrop
        className="backdrop"
        onClick={backDropHandler}
        location={location}
      />
      <S.Menu location={location} parentCoordinate={parentCoordinate}>
        <S.ButtonContainer>
          {menuButtonPropsList.map((props) => (
            <S.MenuButton
              className="menu-button"
              key={props.name}
              {...props}
              name={props.name as string}
            >
              {props.name}
            </S.MenuButton>
          ))}
        </S.ButtonContainer>
        {location === 'bottom' && (
          <S.ButtonContainer>
            <S.MenuButton
              className="menu-button"
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
