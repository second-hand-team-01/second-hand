// Button.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Test';

export default {
  title: 'Example/Button', // Storybook의 사이드바에서 찾을 수 있는 경로
  component: Button, // 해당 스토리의 컴포넌트
} as Meta;
type Story = StoryObj;

// 각 스토리는 이 템플릿을 복제하여 만듭니다.
export const Default = {
  args: {
    isFlexible: false,
  },
};
