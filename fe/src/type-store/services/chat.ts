export interface Bubble {
  type: 'mine' | 'opponent';
  text: string;
  bubbleIdx: number;
}

export interface SendMessage {
  prompt: string;
  action: 'message';
}

export interface MessageObj {
  message: string;
  type?: 'mine' | 'opponent';
}

export interface ChatListProps {
  itemIdx: number;
  user: { memberIdx: number; imgUrl: string; name: string };
  timestamp: Date;
  lastMessage: string;
  previewImg: string;
  unreadChat: number;
  details: ChatDetailsProps;
}

export interface ChatDetailsProps {
  member: {
    memberIdx: number;
    memberId: string;
  };
  salesInfo: {
    previewImg: string;
    title: string;
    price: number;
  };
  messages: MessageObj[] | [];
}

export interface ChatInfo {
  itemIdx: number;
  memberIdx: number;
  list: ChatListProps[];
}

export type ChatPostBody = ChatInfo[];

//  const initialChat: ChatInfo = {
//           itemIdx,
//           memberIdx,
//           list: {
//             itemIdx,
//             user: { memberIdx, imgUrl, name: loginId };
//             timestamp: Date;
//             lastMessage: string;
//             previewImg: string;
//             unreadChat: number;
//           }`
//           de
