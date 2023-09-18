import { ListItemProps } from '@commons/ListItem/ListItem';

export interface APIFavoriteItem {
  itemIdx: number;
  imageUrl: string;
  name: string;
  location: string;
  postedAt: string;
  status: string;
  price: number;
  chat: number;
  like?: number;
  interest?: number;
}

export type FavoriteItem = ListItemProps;

export type FavoriteItemsRes = { hasNext: boolean; items: APIFavoriteItem[] };

export interface PostFavoriteItemBody {
  itemIdx: number;
  interestChecked: boolean;
}

export interface APIPostFavoriteItemBody {
  itemIdx: number;
  interestChecked: boolean;
}
