export interface Item {
  itemIdx: number;
  imageUrl: string;
  name: string;
  location: string;
  postedAt: Date;
  status: '예약중' | '판매중' | null;
  price: number;
  chat: number;
  interest: number;
}
