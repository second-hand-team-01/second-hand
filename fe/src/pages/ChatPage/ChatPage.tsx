import * as S from './ChatPageStyle';
import { Layout, Error } from '@components/commons';
import { ChatList } from './ChatList/ChatList';
import { UserContext } from '@stores/UserContext';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ChatRoom } from '@type-store/services/chat';

import { ERROR_MESSAGE } from '@constants/error';
import {
  getAllChatRooms,
  getOneChatRoom,
  getItemChatRooms,
} from '@services/chats/chat';

export const ChatPage = () => {
  const [chatRooms, setChatRoom] = useState<ChatRoom[]>([]);
  const { itemIdx: itemIdxStr } = useParams();
  const { isLoggedIn, userInfo, loginId } = useContext(UserContext);
  const { memberIdx, imgUrl } = userInfo;

  useEffect(() => {
    let itemIdx: number | null = null;
    if (itemIdxStr && memberIdx) {
      const { error, data } = getItemChatRooms(
        (itemIdx = parseInt(itemIdxStr))
      );
      if (error && !data) {
        return;
      }
      data && setChatRoom(data);
      return;
    }
    const { error, data } = getAllChatRooms();
    if (error || !data) {
      return;
    }
    setChatRoom(data);
  }, [itemIdxStr, userInfo]);

  const renderComps = () => {
    if (isLoggedIn === false) {
      return <Navigate to="/profile" replace />;
    }

    if (!chatRooms) {
      return <Error>{ERROR_MESSAGE.NO_DATA}</Error>;
    }

    if (chatRooms.length === 0) {
      return <Error>채팅 중인 대화방이 없습니다.</Error>;
    }

    return chatRooms.map((chatroom) => {
      const { user } = chatroom;
      return <ChatList key={user.memberIdx} {...chatroom}></ChatList>;
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
