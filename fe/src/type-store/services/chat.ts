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
