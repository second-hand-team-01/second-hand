import { Menu } from './Menu';

export default {
  component: Menu,
};

export const Default = {
  args: {
    location: 'top',
    menuButtonPropsList: [
      {
        shape: 'small',
        state: 'default',
        name: '역삼1동',
      },

      {
        shape: 'small',
        state: 'default',
        name: '내 동네 설정하기',
      },
    ],
  },
};
