import { Dialog } from '@components/commons/index';

export default {
  component: Dialog,
};

export const Default = {
  args: {
    isOpen: true,
    children: '역삼1동을 삭제하시겠어요? 역삼1동을 삭제하시겠어요?',
    btnInfos: { left: { text: '취소' }, right: { text: '삭제' } },
    width: 360,
  },
};
