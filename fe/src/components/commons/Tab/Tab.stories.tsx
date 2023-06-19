import { Tab } from '@components/commons/index';

export default {
  component: Tab,
};

export const Default = {
  args: {
    onClick: ({ target }) => {
      console.log(target.id);
    },
    activeId: 'sale',
    options: [
      { name: '판매중', id: 'sale' },
      { name: '판매완료', id: 'done' },
    ],
  },
};
