import { Profile } from '@components/index';

export default {
  component: Profile,
};

export const Default = {
  args: {
    url: 'https://avatars.githubusercontent.com/u/96381221?v=4',
    isEditable: false,
    size: 80,
  },
};

export const Editable = {
  args: {
    url: 'https://avatars.githubusercontent.com/u/96381221?v=4',
    isEditable: true,
    size: 80,
  },
};

export const Empty = {
  args: {
    url: null,
    isEditable: true,
    size: 80,
  },
};
