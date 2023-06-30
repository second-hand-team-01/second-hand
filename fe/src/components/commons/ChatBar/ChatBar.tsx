import { Button, Dialog, TextInput } from '@commons/index';
import { useEffect, useState } from 'react';
import { useFormInput } from '@hooks/useInput/useInput';
import * as S from './ChatBarStyle';
import { ChatRoom, MessageObj, SendMessage } from '@type-store/services/chat';
import {
  getOneChatRoom,
  saveMessagesToStorage,
  initChatRoomToLocalStorage,
} from '@services/chats/chat';
import { useLocation, useParams } from 'react-router-dom';

interface ChatBarProps {
  messages: MessageObj[];
  sendMessage: (message: SendMessage) => void;
  setMessages: React.Dispatch<React.SetStateAction<MessageObj[]>>;
  salesInfo: ChatRoom['salesInfo'];
  user: ChatRoom['user'];
  chatroomState: [
    ChatRoom | null,
    React.Dispatch<React.SetStateAction<ChatRoom | null>>
  ];
}

export const ChatBar = ({
  sendMessage,
  setMessages,
  messages,
  chatroomState,
}: ChatBarProps) => {
  const { itemIdx: itemIdxStr, memberIdx: sellerIdxStr } = useParams();

  const [chatroom, setChatroom] = chatroomState;
  const { state } = useLocation();

  useEffect(() => {
    if (!itemIdxStr || !sellerIdxStr) return;
    const { data: prevChatroom } = getOneChatRoom(
      parseInt(itemIdxStr),
      parseInt(sellerIdxStr)
    );

    if (!prevChatroom) {
      return;
    }
    setChatroom(prevChatroom);
  }, []);

  const initChatRoom = (initialChatRoom: ChatRoom) => {
    setChatroom(initialChatRoom);
    initChatRoomToLocalStorage(initialChatRoom);
  };

  const saveMessageToChatRoom = (messages: MessageObj[]) => {
    if (!chatroom) return;
    chatroom.messages = messages;
  };

  const uploadBubble = () => {
    if (value === '') return;
    sendMessage({ prompt: value, action: 'message' });
    console.log(chatroom);

    if (!chatroom) {
      const initialChatRoom: ChatRoom = {
        itemIdx: Number(itemIdxStr),
        user: state.user,
        timestamp: new Date(),
        unreadChat: 0,
        salesInfo: state.salesInfo,
        messages: [],
      };
      initChatRoom(initialChatRoom);
    }
    setValue('');
  };

  useEffect(() => {
    if (!chatroom) return;

    saveMessageToChatRoom(messages);
    saveMessagesToStorage(chatroom, messages);
  }, [messages]);

  const [isErrorMessageOpen, setErrorMessageOpen] = useState(false);

  const countId = 'CHAT_COUNT';

  const updateChatCount = () => {
    const prevCount = localStorage.getItem(countId);
    if (!prevCount || isNaN(Number(prevCount))) {
      return localStorage.setItem(countId, '0');
    }
    const updatedCount = Number(prevCount) + 1;
    localStorage.setItem(countId, String(updatedCount));
  };

  const isChatAvailable = () => {
    const prevCount = localStorage.getItem(countId);
    if (!prevCount || isNaN(Number(prevCount))) {
      return true;
    }
    if (Number(prevCount) >= 5) {
      return false;
    }
    return true;
  };

  const handleBtnClick = () => {
    if (!isChatAvailable()) {
      setErrorMessageOpen(true);
      return;
    }
    uploadBubble();
    const message = {
      message: value,
      type: 'mine',
    } as MessageObj;
    setMessages((messages) => [...messages, message]);
    updateChatCount();
  };

  const { value, setValue, onChange } = useFormInput('');

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return;
      if (!isChatAvailable()) {
        setErrorMessageOpen(true);
        return;
      }
      uploadBubble();
      const message = {
        message: value,
        type: 'mine',
      } as MessageObj;
      setMessages((messages) => [...messages, message]);
      updateChatCount();
    }
  };
  return (
    <S.ChatBar>
      <S.TextInputWrap>
        <TextInput
          placeholder="내용을 입력하세요"
          value={value}
          onChange={onChange}
          onKeyDown={handleEnterKeyDown}
          hasBorder={false}
          hasBackground={false}
          shape="small"
        ></TextInput>
      </S.TextInputWrap>
      <Button
        icon="upload"
        backgroundColor="accentBackgroundPrimary"
        color="accentText"
        shape="xSmall"
        onClick={handleBtnClick}
      ></Button>
      <Dialog
        isOpen={isErrorMessageOpen}
        handleBackDropClick={() => {
          setErrorMessageOpen(false);
        }}
        btnInfos={{
          right: {
            text: '확인',
            onClick: async () => {
              setErrorMessageOpen(false);
            },
          },
        }}
      >
        보낼 수 있는 최대 메세지 수를 초과했습니다.
      </Dialog>
    </S.ChatBar>
  );
};
