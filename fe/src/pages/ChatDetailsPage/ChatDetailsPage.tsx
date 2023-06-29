import { Button, Layout, NavbarBtn, ChatBar, Menu } from '@components/commons';
import * as S from './ChatDetailsPageStyle';
import { convertNumToPrice } from '@utils/common/common';
import { Bubble } from './Bubble/Bubble';
import {
  Bubble as BubbleType,
  ChatRoom,
  MessageObj,
} from '@type-store/services/chat';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '@hooks/useChat/useChat';

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
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { messages, setMessages, sendMessage, chatroom, setChatroom } =
    useChat();
  const { state } = useLocation();

  const salesInfo = state?.salesInfo;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: chatroom?.user?.name,
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
      </S.ChatDetailsPage>
      <Menu
        location="bottom"
        menuButtonPropsList={[
          {
            shape: 'large',
            state: 'default',
            color: 'systemWarning',
            name: '채팅방 나가기',
            onClick: () => navigate(-1),
          },
        ]}
        openState={[isMenuOpen, setMenuOpen]}
      ></Menu>
    </Layout>
  );
};
