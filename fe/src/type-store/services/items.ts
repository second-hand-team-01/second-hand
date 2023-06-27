import { ListItemProps } from '@commons/ListItem/ListItem';
import { Category } from './category';

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
  seller: {
    memberIdx: number;
    memberId: string;
  };
  status: Item['status'];
  category: { categoryIdx: number; categoryName: string };
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
  seller: {
    memberIdx: number;
    memberId: string;
  };
  status: Item['status'];
  category: Category;
  description: string;
  price: number;
  chat: number;
  interest: number;
  view: number;
  interestChecked: boolean;
  postedAt: Date;
  images: string[];
}

export interface WriteItemDetails {
  title: string;
  categoryIdx: number;
  description: string;
  price: number;
  images: Image[];
}

export type GetSalesItemsRes = APISalesItem[];

export interface APISalesItem {
  itemIdx: number;
  imageUrl: string;
  name: string;
  location: string;
  postedAt: string;
  status: string;
  price: number;
  chat: number;
  like: number;
}

export enum ItemStatus {
  SELLING = 'selling',
  SOLD = 'sold',
}
