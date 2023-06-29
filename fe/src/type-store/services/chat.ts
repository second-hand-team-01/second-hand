export interface Bubble {
  type: 'mine' | 'opponent';
  text: string;
  bubbleIdx: number;
}

export interface MessageObj {
  message: string;
  type?: 'mine' | 'opponent';
}
