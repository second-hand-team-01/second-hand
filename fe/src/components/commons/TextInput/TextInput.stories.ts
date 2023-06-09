import { TextInput } from '@components/commons/index';

export default {
  component: TextInput,
};

export const Default = {
  args: {
    label: '아이디',
    placeholder: '아이디를 입력하세요',
    height: 44,
  },
};

export const Filled = {
  args: {
    label: '아이디',
    placeholder: '아이디를 입력하세요',
    value: 'realsnoopso',
    height: 44,
  },
};
