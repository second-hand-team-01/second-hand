import * as S from './TabBarStyle';
import { Icon } from '@commons/index';
import icons from '@assets/icons';
import { NavLink } from 'react-router-dom';

interface TabList {
  title: string;
  icon: keyof typeof icons;
  iconSize: number;
  path: string;
}

const tabList: TabList[] = [
  {
    title: '홈화면',
    icon: 'home',
    iconSize: 18,
    path: '/',
  },
  {
    title: '판매내역',
    icon: 'list',
    iconSize: 18,
    path: '/sales-history',
  },
  {
    title: '관심목록',
    icon: 'heart',
    iconSize: 18,
    path: '/favorites',
  },
  {
    title: '채팅',
    icon: 'talk',
    iconSize: 18,
    path: '/chat',
  },
  {
    title: '내 계정',
    icon: 'person',
    iconSize: 18,
    path: '/profile',
  },
];

export const TabBar = () => {
  return (
    <S.TabBar>
      {tabList.map((tab: TabList) => {
        return (
          <NavLink to={tab.path} key={tab.title}>
            {({ isActive }) => (
              <S.Tab>
                <Icon
                  name={tab.icon}
                  size={tab.iconSize}
                  color={isActive ? 'neutralText' : 'neutralTextWeak'}
                />
                <S.TabTitle
                  color={isActive ? 'neutralText' : 'neutralTextWeak'}
                >
                  {tab.title}
                </S.TabTitle>
              </S.Tab>
            )}
          </NavLink>
        );
      })}
    </S.TabBar>
  );
};
