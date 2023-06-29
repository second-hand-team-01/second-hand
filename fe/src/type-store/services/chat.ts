export interface Bubble {
  type: 'mine' | 'opponent';
  text: string;
  bubbleIdx: number;
}

export interface Message {
  action: string;
  prompt: string;
}

export interface ReceivedMessage {
  message: string;
  type?: 'mine' | 'opponent';
}
