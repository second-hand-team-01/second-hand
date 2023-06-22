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

export interface ItemReqBody {
  title: string;
  price: number;
  contents: string;
  locationIdx: number;
  categoryIdx: number;
  images: string[];
}

export interface APIItemReqBody {
  title: string;
  price: string;
  description: string;
  locationIdx: string;
  categoryIdx: string;
  images: string[];
}

export interface PostItemRes {
  itemIdx: number;
}
