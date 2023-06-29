import { Button, Dialog, TextInput } from '@commons/index';
import { useContext, useState } from 'react';
import { useFormInput } from '@hooks/useInput/useInput';
import * as S from './ChatBarStyle';
import {
  ChatListProps,
  MessageObj,
  SendMessage,
} from '@type-store/services/chat';
import { setChatInfo } from '@services/chats/chat';
import { useParams } from 'react-router-dom';
import { UserContext } from '@stores/UserContext';

interface ChatBarProps {
  messages: MessageObj[];
  sendMessage: (message: SendMessage) => void;
  setMessages: React.Dispatch<React.SetStateAction<MessageObj[]>>;
  salesInfo: ChatListProps['salesInfo'];
}

export const ChatBar = ({
  sendMessage,
  setMessages,
  messages,
  salesInfo,
}: ChatBarProps) => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { memberIdx, loginId, imgUrl } = userInfo;
  const { itemIdx: itemIdxStr, memberIdx: memberIdxStr } = useParams();

  const uploadBubble = () => {
    if (value === '') return;
    const message = {
      prompt: value,
      action: 'message',
    };
    sendMessage({ prompt: value, action: 'message' });
    if (itemIdxStr && memberIdxStr && messages.length === 0) {
      const itemIdx = parseInt(itemIdxStr);
      const memberIdx = parseInt(memberIdxStr);
      const chatList: ChatListProps = {
        itemIdx,
        user: {
          memberIdx,
          imgUrl,
          name: loginId,
        },
        timestamp: new Date(),
        unreadChat: 0,
        salesInfo,
        messages: [{ message: value, type: 'mine' }],
      };
      setChatInfo(chatList);
    }
    setValue('');
  };

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
