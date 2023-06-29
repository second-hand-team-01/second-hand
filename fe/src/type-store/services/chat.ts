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
  userIdx: number;
  list: ChatListProps;
  details: ChatDetailsProps;
}

export type ChatPostBody = ChatInfo[];
