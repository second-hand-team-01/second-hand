import * as S from './NavBarStyle';
import { Icon } from '@components/commons/Icon/Icon';
import { icons } from '@assets/icons';

interface BtnInfo {
  text?: string;
  icon: string;
  onClick: () => void;
}
export interface NavBarProps {
  title?: string;
  hasTab: boolean;
  leftBtn?: BtnInfo;
  rightBtn?: BtnInfo;
}

export const NavBar = ({ title, hasTab, leftBtn, rightBtn }: NavBarProps) => {
  return <div>NavBar</div>;
};
