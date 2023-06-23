import {
  APIItemReqBody,
  Item,
  ItemReqBody,
  PostItemRes,
} from '@type-store/services/items';
import { ListItemProps } from '@commons/ListItem/ListItem';
import { customFetch } from '@services/apis/apis';
import { Response } from '@hooks/useFetch/useFetch';
import { ERROR_MESSAGE } from '@constants/error';

export interface ListItemPropsWithId extends ListItemProps {
  id: number;
}

export const convertItemsToListItems = (
  items: Item[]
): ListItemPropsWithId[] => {
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
      interest,
    } = item;

    const newItem: ListItemPropsWithId = {
      id: itemIdx,
      title: name,
      imgUrl: imageUrl,
      location: location,
      timeStamp: new Date(postedAt),
      price: price,
      state: status,
      like: interest,
      chat: chat,
      moreBtn: false,
      onClick: () => {
        console.log('click');
      },
    };
    return newItem;
  });
};

interface GetItemsRes {
  hasNext: boolean;
  items: Item[];
}

export interface ConvertedGetItemsRes {
  hasNext: boolean;
  items: ListItemPropsWithId[];
}

export const getItemsAPI = async (page: number) => {
  try {
    const res = (await customFetch<null, GetItemsRes>({
      path: '/items',
      method: 'GET',
      queries: { page },
    })) as Response<GetItemsRes>;

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    const { hasNext, items } = res.data;
    return {
      ...res,
      data: {
        hasNext,
        items: convertItemsToListItems(items) as ListItemPropsWithId[],
      },
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};

// const convertUserInfoBodyToAPIReqBody = (
//   body: UserInfoBody
// ): APIUserInfoBody => {};

const convertItemReqBodyToAPIReqBody = (body: ItemReqBody): APIItemReqBody => {
  const { title, price, contents, locationIdx, categoryIdx, images } = body;

  const imageFiles = images.map((image) => image.file);

  const newItem: APIItemReqBody = {
    title,
    price: price.toString(),
    description: contents,
    locationIdx: locationIdx.toString(),
    categoryIdx: categoryIdx.toString(),
    images: imageFiles,
  };
  return newItem;
};

export const postItemsAPI = async (body: ItemReqBody) => {
  const convertedBody = convertItemReqBodyToAPIReqBody(body);
  if (!convertedBody)
    return { error: { message: ERROR_MESSAGE.FILE_UPLOAD_ERROR } };

  const formData = new FormData();
  formData.append('title', convertedBody.title);
  formData.append('description', convertedBody.description);
  formData.append('price', convertedBody.price);
  formData.append('locationIdx', convertedBody.locationIdx);
  formData.append('categoryIdx', convertedBody.categoryIdx);
  convertedBody.images.forEach((image, i) => {
    formData.append(`image${i}`, image);
  });

  try {
    const res = (await customFetch<FormData, PostItemRes>({
      path: '/items',
      method: 'POST',
      body: formData,
    })) as Response<PostItemRes>;
    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    return {
      data: {
        itemIdx: res.data.itemIdx,
      },
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};
