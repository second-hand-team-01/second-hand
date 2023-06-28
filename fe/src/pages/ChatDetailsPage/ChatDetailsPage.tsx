import { Layout, NavbarBtn } from '@components/commons';
import * as S from './ChatDetailsPageStyle';
import { convertNumToPrice } from '@utils/common/common';

interface ChatDetailsPage {
  salesInfo: {
    previewImg: string;
    title: string;
    price: number;
  };
}

export const ChatDetailsPage = () => {
  const salesInfo = {
    previewImg: 'https://img-cf.kurly.com/shop/data/goods/1656498787170l0.jpg',
    title: '화장품',
    price: 1110101010101001,
  };
  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: '유저 이름',
          leftBtn: <NavbarBtn path="back" text="뒤로"></NavbarBtn>,
          rightBtn: <NavbarBtn path="back" text="뒤로"></NavbarBtn>,
        },
        bottomComp: (
          <S.HeaderBottomWrap>
            <S.Preview src={salesInfo.previewImg}></S.Preview>
            <S.Contents>
              <S.Title>{salesInfo.title}</S.Title>
              <S.Price>{convertNumToPrice(salesInfo.price) + '원'}</S.Price>
            </S.Contents>
          </S.HeaderBottomWrap>
        ),
      }}
    >
      <S.ChatDetailsPage></S.ChatDetailsPage>
    </Layout>
  );
};
