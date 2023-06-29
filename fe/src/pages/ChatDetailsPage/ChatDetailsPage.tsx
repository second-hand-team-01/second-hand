import {
  Button,
  Layout,
  NavbarBtn,
  ChatBar,
  Menu,
  Dialog,
} from '@components/commons';
import * as S from './ChatDetailsPageStyle';
import { convertNumToPrice } from '@utils/common/common';
import { Bubble } from './Bubble/Bubble';
import {
  Bubble as BubbleType,
  ChatRoom,
  MessageObj,
} from '@type-store/services/chat';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import { useChat } from '@hooks/useChat/useChat';
import { getOneChatRoom, removeChatRoom } from '@services/chats/chat';
import { ERROR_MESSAGE } from '@constants/error';
import { ChatList } from '@pages/ChatPage/ChatList/ChatListStyle';
import { UserContext } from '@stores/UserContext';

const convertMessageToBubble = (messages: MessageObj[]): BubbleType[] => {
  return messages.map((message) => {
    const { message: text, type } = message;
    return {
      type: type as BubbleType['type'],
      text,
      bubbleIdx: 0,
    };
  });
};

export const ChatDetailsPage = () => {
  const navigate = useNavigate();
  const { itemIdx: itemIdxStr, memberIdx: memberIdxStr } = useParams();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);

  const { messages, setMessages, sendMessage, chatroom, setChatroom } =
    useChat();

  const { state } = useLocation();

  const salesInfo = state?.salesInfo;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const { data: chatroom } = getOneChatRoom(
      Number(itemIdxStr),
      Number(memberIdxStr)
    );
    if (chatroom) {
      setChatroom(chatroom);
      setMessages(chatroom.messages);
    }
  }, [itemIdxStr, memberIdxStr]);

  const { isLoggedIn, userInfo, loginId } = useContext(UserContext);

  const renderComps = () => {
    if (isLoggedIn === false) {
      return <Navigate to="/profile" replace />;
    }

    return (
      <S.ChatDetailsPage>
        {convertMessageToBubble(messages).map((message, i) => {
          return (
            <Bubble
              type={message.type === 'mine' ? 'mine' : 'opponent'}
              key={i}
            >
              {message.text}
            </Bubble>
          );
        })}
        <div ref={messagesEndRef} />
        <Menu
          location="bottom"
          menuButtonPropsList={[
            {
              shape: 'large',
              state: 'default',
              color: 'systemWarning',
              name: '채팅방 나가기',
              onClick: () => {
                const { data, error } = removeChatRoom(
                  Number(itemIdxStr),
                  Number(memberIdxStr)
                );
                if (error || !data) {
                  setErrorDialogOpen(true);
                }
                navigate(-1);
              },
            },
          ]}
          openState={[isMenuOpen, setMenuOpen]}
        ></Menu>
        <Dialog
          isOpen={isErrorDialogOpen}
          btnInfos={{
            right: {
              text: '확인',
              onClick: () => {
                setErrorDialogOpen(false);
              },
            },
          }}
          handleBackDropClick={() => setErrorDialogOpen(false)}
        >
          삭제하면서 에러가 발생했어요. 다시 시도해주세요.
        </Dialog>
      </S.ChatDetailsPage>
    );
  };

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: chatroom?.user?.name ?? state?.user.name,
          leftBtn: <NavbarBtn path="back" text="뒤로"></NavbarBtn>,
          rightBtn: (
            <Button
              icon="more"
              shape="ghost"
              isWidthFitContent={true}
              color="neutralText"
              backgroundColor="transparent"
              onClick={() => {
                setMenuOpen(true);
              }}
            ></Button>
          ),
        },
        bottomComp: (
          <S.HeaderBottomWrap>
            <S.Preview
              src={
                chatroom?.salesInfo?.previewImg ?? state?.salesInfo?.previewImg
              }
            ></S.Preview>
            <S.Contents>
              <S.Title>
                {chatroom?.salesInfo?.title ?? state?.salesInfo?.title}
              </S.Title>
              <S.Price>
                {convertNumToPrice(
                  chatroom?.salesInfo?.price ?? state?.salesInfo?.price ?? 0
                ) + '원'}
              </S.Price>
            </S.Contents>
          </S.HeaderBottomWrap>
        ),
      }}
      footerOption={{
        comp: (
          <ChatBar
            salesInfo={salesInfo}
            messages={messages}
            sendMessage={sendMessage}
            setMessages={setMessages}
            chatroomState={[chatroom, setChatroom]}
            user={state?.user}
          ></ChatBar>
        ),
      }}
    >
      {renderComps()}
    </Layout>
  );
};
