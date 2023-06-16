import { useState } from 'react';
import * as S from './TabBarStyle';
import { Icon } from '@commons/index';
import { icons } from '@assets/icons';

interface TabList {
  title: string;
  icon: keyof typeof icons;
  iconSize: number;
}

const tabList: TabList[] = [
  {
    title: '홈화면',
    icon: 'home',
    iconSize: 18,
  },
  {
    title: '판매내역',
    icon: 'list',
    iconSize: 18,
  },
  {
    title: '관심목록',
    icon: 'heart',
    iconSize: 18,
  },
  {
    title: '채팅',
    icon: 'talk',
    iconSize: 18,
  },
  {
    title: '내 계정',
    icon: 'person',
    iconSize: 18,
  },
];

// TODO(POCO) : useParams, useState 사용해서 Tab에 active 색상 변경하기, onClick 이벤트 추가하기
// TODO(POCO) : tabList 배열 요소의 객체에 id 값 추가해서 params와 일치 시키기

export const TabBar = () => {
  const [activeTab, setActiveTab] = useState('홈화면');

  const tabClickHandler = (title: string) => {
    setActiveTab(title);
  };

  return (
    <S.TabBar>
      {tabList.map((tab: TabList) => {
        const isActive =
          activeTab === tab.title ? 'neutralText' : 'neutralTextWeak';

        return (
          <S.Tab key={tab.title} onClick={() => tabClickHandler(tab.title)}>
            <Icon name={tab.icon} size={tab.iconSize} color={isActive} />
            <S.TabTitle color={isActive}>{tab.title}</S.TabTitle>
          </S.Tab>
        );
      })}
    </S.TabBar>
  );
};
