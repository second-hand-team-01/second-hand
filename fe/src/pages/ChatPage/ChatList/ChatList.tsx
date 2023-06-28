import { Profile } from '@components/commons';
import * as S from './ChatListStyle';
import { convertDateToTimeStamp } from '@utils/common/common';

export interface ChatListProps {
  chatIdx: number;
  chat: number;
  user: { imgUrl: string; name: string };
  timestamp: Date;
  lastMessage: string;
  previewImg: string;
}

export const ChatList = ({
  chat,
  user,
  timestamp,
  lastMessage,
  previewImg,
}: ChatListProps) => {
  const hasChat = chat !== 0;
  return (
    <S.ChatList hasChat={hasChat}>
      <Profile size={48} imgUrl={user.imgUrl}></Profile>
      <S.Contents>
        <S.ContentsHeader>
          <S.User>{user.name}</S.User>
          <S.Timestamp>{convertDateToTimeStamp(timestamp)}</S.Timestamp>
        </S.ContentsHeader>
        <S.Message>{lastMessage}</S.Message>
      </S.Contents>
      {hasChat && <S.ChatNum>{chat}</S.ChatNum>}
      <S.Preview src={previewImg}></S.Preview>
    </S.ChatList>
  );
};
