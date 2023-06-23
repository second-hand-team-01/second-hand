import { SnackBar } from '@components/commons/index';

export default {
  component: SnackBar,
};

export const Default = {
  args: {
    isOpen: true,
    children: '역삼1동을 삭제하시겠어요? 역삼1동을 삭제하시겠어요?',
    btnInfos: { text: '확인' },
  },
};
