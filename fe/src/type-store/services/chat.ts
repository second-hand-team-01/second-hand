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
  unreadChat: number;
  salesInfo: {
    previewImg: string;
    title: string;
    price: number;
  };
  messages: MessageObj[];
}

export type ChatPostBody = ChatListProps[];
