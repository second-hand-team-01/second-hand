import { ListItem } from './ListItem';

export default {
  component: ListItem,
};

export const Default = {
  args: {
    title: '도자기 화병 5종',
    imgUrl: 'as',
    location: '역삼1동',
    timeStamp: '1시간 전',
    price: 10000,
    state: '예약중',
    like: 1,
    chat: 2,
    moreBtn: true,
    moreBtnIcon: {
      name: 'more',
      size: 15,
      color: 'neutralTextWeak',
    },
    chatIcon: {
      name: 'talk',
      size: 13,
      color: 'neutralText',
    },
    heartIcon: {
      name: 'heart',
      size: 13,
      color: 'neutralText',
    },
  },
};
