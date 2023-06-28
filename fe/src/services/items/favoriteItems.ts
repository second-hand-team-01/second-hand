import { customFetch } from '@services/apis/apis';
import {
  APIFavoriteItem,
  FavoriteItem,
  FavoriteItemsRes,
  PostFavoriteItemBody,
  APIPostFavoriteItemBody,
} from '@type-store/services/favoriteItems';
import { ListItemProps } from '@commons/ListItem/ListItem';
import { Response } from '@hooks/useFetch/useFetch';

export const convertResToFavoriteItems = (
  items: APIFavoriteItem[]
): FavoriteItem[] => {
  return items.map((item) => {
    const {
      itemIdx,
      imageUrl,
      name,
      location,
      postedAt,
      status,
      price,
      chat,
      like,
    } = item;

    const newItem: ListItemProps = {
      itemIdx: itemIdx,
      title: name,
      imgUrl: imageUrl,
      location: location,
      timeStamp: new Date(postedAt),
      price: price,
      state: status,
      like,
      chat: chat,
      moreBtn: false,
      interestChecked: true,
    };
    return newItem;
  });
};

export const getFavoriteItemsAPI = async (categoryIdx?: number) => {
  const queries = categoryIdx === -1 ? undefined : { categoryIdx };
  try {
    const res = (await customFetch<null, FavoriteItemsRes>({
      path: `/members/interest`,
      method: 'GET',
      queries,
    })) as Response<FavoriteItemsRes>;

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    const items = res.data;
    return {
      ...res,
      data: convertResToFavoriteItems(items),
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};

export const convertPostFavoriteItemToAPIBody = (
  body: PostFavoriteItemBody
): APIPostFavoriteItemBody => {
  const { itemIdx, interestChecked } = body;
  return { itemIdx, interestChecked };
};

export const postFavoriteItemAPI = async (body: PostFavoriteItemBody) => {
  const convertedBody = convertPostFavoriteItemToAPIBody(body);

  try {
    const res = await customFetch<APIPostFavoriteItemBody, undefined>({
      path: `/members/interest`,
      method: 'POST',
      body: convertedBody,
    });

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    return {};
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};
