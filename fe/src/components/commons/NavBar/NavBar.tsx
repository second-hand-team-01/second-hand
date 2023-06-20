import * as S from './NavBarStyle';
import { Button, Tab } from '@commons/index';
import { icons } from '@assets/icons';
import { TabProps } from '@commons/Tab/Tab';

interface BtnInfo {
  text?: string;
  icon: keyof typeof icons;
  onClick: () => void;
}

export interface NavBarProps {
  title?: string;
  leftBtn?: BtnInfo;
  rightBtn?: BtnInfo;
  tabInfo?: TabProps;
}

export const NavBar = ({ title, leftBtn, rightBtn, tabInfo }: NavBarProps) => {
  return (
    <S.Header>
      <S.HeaderTop>
        <S.ButtonContainer>
          {leftBtn && (
            <Button
              shape="small"
              title={leftBtn.text}
              icon={leftBtn.icon ?? undefined}
              onClick={leftBtn.onClick}
              color="neutralText"
            ></Button>
          )}
        </S.ButtonContainer>
        <S.Title>{title}</S.Title>
        <S.ButtonContainer>
          {rightBtn && (
            <Button
              shape="small"
              title={rightBtn.text}
              icon={rightBtn.icon ?? undefined}
              onClick={rightBtn.onClick}
              color="neutralText"
            ></Button>
          )}
        </S.ButtonContainer>
      </S.HeaderTop>
      {tabInfo && (
        <S.HeaderBottom>
          <Tab {...tabInfo}></Tab>
        </S.HeaderBottom>
      )}
    </S.Header>
  );
};
