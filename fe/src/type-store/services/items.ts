import { ListItemProps } from '@commons/ListItem/ListItem';

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

export interface Image {
  file: string;
  name: string;
  size: number;
}

export interface ItemReqBody {
  title: string;
  price: number;
  contents: string;
  locationIdx: number;
  categoryIdx: number;
  images: Image[];
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

export interface ListItemPropsWithId extends ListItemProps {
  id: number;
}

export interface GetItemsRes {
  hasNext: boolean;
  items: Item[];
}

export interface ConvertedGetItemsRes {
  hasNext: boolean;
  items: ListItemPropsWithId[];
}

export interface APIItemDetail {
  itemIdx: number;
  title: string;
  sellerId: string;
  status: Item['status'];
  category: string;
  description: string;
  price: number;
  chat: number;
  interest: number;
  view: number;
  interestChecked: boolean;
  postedAt: string;
  images: string[];
}

export interface ItemDetail {
  itemIdx: number;
  title: string;
  sellerId: string;
  status: Item['status'];
  category: string;
  description: string;
  price: number;
  chat: number;
  interest: number;
  view: number;
  interestChecked: boolean;
  postedAt: Date;
  images: string[];
}
