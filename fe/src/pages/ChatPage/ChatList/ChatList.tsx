import { Profile } from '@components/commons';
import * as S from './ChatListStyle';
import { convertDateToTimeStamp } from '@utils/common/common';
import { useNavigate } from 'react-router-dom';
import { ChatListProps } from '@type-store/services/chat';

export const ChatList = ({
  itemIdx,
  unreadChat,
  user,
  timestamp,
  messages,
  salesInfo,
}: ChatListProps) => {
  const navigate = useNavigate();
  const hasChat = unreadChat !== 0;
  return (
    <S.ChatList
      hasChat={hasChat}
      onClick={() => navigate(`/chat/${itemIdx}/${user.memberIdx}`)}
    >
      <Profile size={48} imgUrl={user.imgUrl}></Profile>
      <S.Contents>
        <S.ContentsHeader>
          <S.User>{user.name}</S.User>
          <S.Timestamp>{convertDateToTimeStamp(timestamp)}</S.Timestamp>
        </S.ContentsHeader>
        <S.Message>{messages[messages.length - 1].message}</S.Message>
      </S.Contents>
      {hasChat && <S.ChatNum>{unreadChat}</S.ChatNum>}
      <S.Preview src={salesInfo.previewImg}></S.Preview>
    </S.ChatList>
  );
};
