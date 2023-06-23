export interface APICategory {
  idx: number;
  name: string;
  imgUrl: string;
}

export interface Category {
  idx: number;
  name: string;
  imgUrl: string;
}

export type CategoryRes = Category[];
