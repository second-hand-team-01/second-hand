import { customFetch } from '@services/apis/apis';
import { Response } from '@hooks/useFetch/useFetch';
import {
  APICategory,
  APIFavoriteCategory,
  Category,
  CategoryRes,
  FavoriteCategory,
  FavoriteCategoryRes,
} from '@type-store/services/category';

export const convertResToCategory = (categories: APICategory[]): Category[] => {
  return categories.map((category) => {
    const { idx, name, imgUrl } = category;
    const newCategory: Category = {
      idx,
      text: name,
      imgUrl,
    };
    return newCategory;
  });
};

export const getCategoryAPI = async () => {
  try {
    const res = (await customFetch<null, CategoryRes>({
      path: '/category',
      method: 'GET',
    })) as Response<CategoryRes>;

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    const categories = res.data;
    return {
      ...res,
      data: convertResToCategory(categories),
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};

export const convertResToFavoriteCategory = (
  categories: APIFavoriteCategory[]
): FavoriteCategory[] => {
  return categories.map((category) => {
    const { idx, name } = category;
    const newCategory: Category = {
      idx,
      text: name,
    };
    return newCategory;
  });
};

export const getFavoriteCategoryAPI = async () => {
  try {
    const res = (await customFetch<null, FavoriteCategoryRes>({
      path: '/members/interest/category',
      method: 'GET',
    })) as Response<FavoriteCategoryRes>;

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    const categories = res.data;
    return {
      ...res,
      data: convertResToFavoriteCategory(categories),
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};
