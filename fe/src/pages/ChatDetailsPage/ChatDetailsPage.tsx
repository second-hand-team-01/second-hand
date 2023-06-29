import { Button, Layout, NavbarBtn, ChatBar, Menu } from '@components/commons';
import * as S from './ChatDetailsPageStyle';
import { convertNumToPrice } from '@utils/common/common';
import { Bubble } from './Bubble/Bubble';
import {
  Bubble as BubbleType,
  Message,
  ReceivedMessage,
} from '@type-store/services/chat';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onChat } from '@hooks/useChat/useChat';

interface ChatDetailsPage {
  salesInfo: {
    previewImg: string;
    title: string;
    price: number;
  };
}

const convertMessageToBubble = (messages: ReceivedMessage[]): BubbleType[] => {
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

  const { messages, setMessages, sendMessage } = onChat();

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const [bubbles, setBubbles] = useState<BubbleType[]>([
    { type: 'mine', text: '안녕하세요, 챗방입니다!', bubbleIdx: 0 },
    {
      type: 'opponent',
      text: '반가워요 저는 스눕이에요 반가워요 저는 스눕이에요 반가워요 저는 스눕이에요 반가워요 저는 스눕이에요 반가워요 저는 스눕이에요 반가워요 저는 스눕이에요',
      bubbleIdx: 1,
    },
    { type: 'mine', text: '사실건지 말씀해주세요', bubbleIdx: 2 },
    { type: 'opponent', text: '넹', bubbleIdx: 3 },
    { type: 'opponent', text: '넹', bubbleIdx: 4 },
  ]);

  const salesInfo = {
    previewImg: 'https://img-cf.kurly.com/shop/data/goods/1656498787170l0.jpg',
    title: '화장품',
    price: 1110101010101001,
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [bubbles]);

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: '스눕',
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
            <S.Preview src={salesInfo.previewImg}></S.Preview>
            <S.Contents>
              <S.Title>{salesInfo.title}</S.Title>
              <S.Price>{convertNumToPrice(salesInfo.price) + '원'}</S.Price>
            </S.Contents>
          </S.HeaderBottomWrap>
        ),
      }}
      footerOption={{
        comp: (
          <ChatBar
            sendMessage={sendMessage}
            setMessages={setMessages}
          ></ChatBar>
        ), // sendMessage 함수 전달
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
