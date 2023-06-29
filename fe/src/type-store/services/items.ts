import { ListItemProps } from '@commons/ListItem/ListItem';
import { Category } from './category';

export interface Item {
  itemIdx: number;
  imageUrl: string;
  name: string;
  location: string;
  postedAt: string;
  status: ItemStatus | null;
  price: number;
  chat: number;
  interest: number;
  interestChecked: boolean;
}

export interface Image {
  file: File | null;
  fileString: string;
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

export interface StatusReqBody {
  status: ItemStatus;
}

export interface APIStatusReqBody {
  status: ItemStatus;
}

export interface APIItemReqBody {
  name: string;
  price: string;
  description: string;
  locationIdx: string;
  categoryIdx: string;
  images: File[] | null;
}

export interface PostItemRes {
  itemIdx: number;
}

export interface GetItemsRes {
  hasNext: boolean;
  items: Item[];
}

export interface ConvertedGetItemsRes {
  hasNext: boolean;
  items: ListItemProps[];
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

export type GetSalesItemsRes = { hasNext: boolean; items: APISalesItem[] };

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
  interestChecked: boolean;
}

export type ItemStatus = '판매중' | '예약중' | '판매완료';
