import { Item, ListItemPropsWithId } from './items';

export type APIFavoriteItem = {
  itemIdx: number;
  imageUrl: string;
  name: string;
  location: string;
  postedAt: string;
  status: string;
  price: number;
  chat: number;
  like: number;
};

export type FavoriteItem = ListItemPropsWithId;

export type FavoriteItemsRes = APIFavoriteItem[];
