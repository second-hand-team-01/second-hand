import { NavBar } from '@commons/index';
import { useState } from 'react';

export default {
  component: NavBar,
};

export const Default = {
  args: {
    title: '타이틀',
    leftBtn: { text: '뒤로', icon: 'arrowLeft' },
    rightBtn: { text: '뒤로' },
  },
};

export const WithTab = {
  args: {
    title: '타이틀',
    leftBtn: { text: '뒤로', icon: 'arrowLeft' },
    rightBtn: { text: '뒤로' },
    tabInfo: {
      onClick: ({ target }) => {
        console.log(target.id);
      },
      activeId: 'sale',
      options: [
        { name: '판매중', id: 'sale' },
        { name: '판매완료', id: 'done' },
      ],
    },
  },
};
