import { Button, TextInput } from '@commons/index';
import { ChangeEvent } from 'react';
import { useFormInput } from '@hooks/useInput/useInput';
import * as S from './ChatBarStyle';
import {
  Bubble as BubbleType,
  ReceivedMessage,
} from '@type-store/services/chat';

interface ChatBarProps {
  sendMessage: any;
  setMessages: React.Dispatch<React.SetStateAction<ReceivedMessage[]>>;
}

export const ChatBar = ({ sendMessage, setMessages }: ChatBarProps) => {
  const uploadBubble = () => {
    if (value === '') return;
    sendMessage({ prompt: value, action: 'message' });
    setValue('');
  };

  const handleBtnClick = () => {
    uploadBubble();
  };

  const { value, setValue, onChange } = useFormInput('');

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return;
      const message = {
        message: value,
        type: 'mine',
      } as ReceivedMessage;
      setMessages((messages) => [...messages, message]);
      uploadBubble();
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
    </S.ChatBar>
  );
};
