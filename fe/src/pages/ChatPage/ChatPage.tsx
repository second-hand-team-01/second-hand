import * as S from './ChatPageStyle';
import { Layout } from '@components/commons';
import { ChatList } from './ChatList/ChatList';
import { UserContext } from '@stores/UserContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ChatListProps } from '@type-store/services/chat';

export const ChatPage = () => {
  const chatList: ChatListProps[] = [
    {
      itemIdx: 1,
      unreadChat: 2,
      user: {
        memberIdx: 0,
        name: '스눕',
        imgUrl:
          'https://www.indiewire.com/wp-content/uploads/2021/02/The_Snoopy_Show_Photo_010101.jpg?w=3000&h=2000&crop=1',
      },
      timestamp: new Date(),
      lastMessage: '안녕하세요 저는 스눕이예요!',
      previewImg:
        'https://3p-image.kurly.com/cdn-cgi/image/quality=85,width=676/product-image/da44c42c-9e28-445e-acfb-0ef79f438f7e/704b6dc2-b8ba-439f-adbf-f204e90f19db.jpg',
    },
    {
      itemIdx: 1,
      unreadChat: 0,
      user: {
        memberIdx: 1,
        name: '진짜스눕',
        imgUrl:
          'https://cdnph.upi.com/svc/sv/i/6781685015440/2023/1/16850171782246/Snoopy-returns-as-debonair-as-ever-in-new-Snoopy-Show-trailer.jpg',
      },
      timestamp: new Date('2023-05-16T17:16:05'),
      lastMessage: '구매 가능할까요?',
      previewImg:
        'https://3p-image.kurly.com/cdn-cgi/image/quality=85,width=676/product-image/da44c42c-9e28-445e-acfb-0ef79f438f7e/704b6dc2-b8ba-439f-adbf-f204e90f19db.jpg',
    },
  ];

  const { isLoggedIn } = useContext(UserContext);

  const renderComps = () => {
    if (!isLoggedIn) {
      return <Navigate to="/profile" replace />;
    }

    return chatList.map((chat) => {
      const { user } = chat;
      return <ChatList key={user.memberIdx} {...chat}></ChatList>;
    });
  };

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: '채팅',
        },
      }}
      footerOption={{ type: 'tab' }}
    >
      <S.ChatPage>{renderComps()}</S.ChatPage>
    </Layout>
  );
};
