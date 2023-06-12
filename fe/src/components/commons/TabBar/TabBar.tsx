import * as S from './TabBarStyle';
import { Icon } from '@commons/index';
import { icons } from '@assets/icons';

export interface TabBarStyleProps {
  title: string;
  name: string;
  icon: keyof typeof icons;
  iconSize?: number;
  iconColor?: string;
}

interface TabBarProps extends TabBarStyleProps {
  onClick?: () => void;
}

// tab 정보들

export const TabBar = ({
  title,
  icon,
  iconSize,
  iconColor,
  onClick,
}: TabBarProps) => {
  return (
    <S.TabBar onClick={onClick}>
      <Icon name={icon} size={iconSize} color={iconColor} />
      <span>{title}</span>
    </S.TabBar>
  );
};

// 상위에 const로 tab에 대한 내용을 선언하고 하위 컴포넌트에게
// props로 해당 내용을 전달하는 경우
// 상위 컴포넌트가 리렌더링(함수의 재실행)이 될때
// const로 선언한 값이 다시 읽히고 메모  하위 컴포넌트
