import { BottomSheet } from '@components/commons/index';
import { useState } from 'react';

export default {
  component: BottomSheet,
};

export const Default = {
  args: {
    leftBtn: { text: '뒤로', icon: 'arrowLeft' },
    rightBtn: { text: '뒤로' },
    title: '타이틀',
    hasSearchInput: false,
    children: `ContentsContentsContentsContentsContentsContents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents
          ContentsContentsContentsContentsContentsContentsContents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents Contents
          Contents Contents Contents Contents Contents Contents`,
  },
};

export const WithSearchInput = {
  args: {
    leftBtn: { text: '뒤로', icon: 'arrowLeft' },
    rightBtn: { text: '뒤로' },
    title: '타이틀',
    hasSearchInput: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget;
    },
  },
};
