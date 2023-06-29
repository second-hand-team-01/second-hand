export interface APICategory {
  idx: number;
  name: string;
  imgUrl: string;
}

export interface Category {
  idx: number;
  text: string;
  imgUrl?: string;
}

export interface FavoriteCategory {
  idx: number;
  text: string;
}

export interface APIFavoriteCategory {
  idx: number;
  name: string;
}

export type CategoryRes = APICategory[];

export type FavoriteCategoryRes = APIFavoriteCategory[];
