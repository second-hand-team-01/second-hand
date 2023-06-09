import { Dropdown } from '@components/commons/index';

export default {
  component: Dropdown,
};

export const Default = {
  args: {
    children: '역삼1동',
    isOpen: false,
    onClick: () => alert('onClick!'),
  },
};
