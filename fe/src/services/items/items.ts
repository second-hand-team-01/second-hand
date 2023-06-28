import {
  APIItemReqBody,
  Item,
  ItemReqBody,
  PostItemRes,
  ListItemPropsWithId,
  GetItemsRes,
  ItemDetail,
  APIItemDetail,
  WriteItemDetails,
  ItemStatus,
  APISalesItem,
} from '@type-store/services/items';
import { customFetch } from '@services/apis/apis';
import { Response } from '@hooks/useFetch/useFetch';
import { ERROR_MESSAGE } from '@constants/error';
import { Image, GetSalesItemsRes } from '@type-store/services/items';
import { Category } from '@type-store/services/category';
import { getRandomElements, removeEmptyKeyValues } from '@utils/common/common';
import { LOCATION_FALLBACK } from '@constants/login';

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
      interestChecked,
    } = item;

    const newItem: ListItemPropsWithId = {
      id: itemIdx,
      title: name,
      imgUrl: imageUrl,
      location,
      timeStamp: new Date(postedAt),
      price,
      state: status,
      like: interest,
      chat,
      moreBtn: false,
      interestChecked,
    };
    return newItem;
  });
};

export const getItemsAPI = async (
  page: number,
  categoryIdx?: number,
  locationIdx?: number
) => {
  const queries = removeEmptyKeyValues({
    page,
    categoryIdx,
  });

  queries['locationIdx'] = locationIdx ?? LOCATION_FALLBACK.locationIdx;

  try {
    const res = (await customFetch<null, GetItemsRes>({
      path: '/items',
      method: 'GET',
      queries,
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

export const convertAPIItemsDetailsToWriteItemsDetails = (
  details: ItemDetail
): WriteItemDetails => {
  const { title, category, description, price, images } = details;
  const newImages = images.map((image): Image => {
    return { file: image, size: -1, name: '' };
  });
  return {
    title,
    categoryIdx: category.idx,
    description,
    price,
    images: newImages,
  };
};

const convertAPIItemDetailsToItemDetails = (
  details: APIItemDetail
): ItemDetail => {
  const {
    itemIdx,
    title,
    seller,
    status,
    category,
    description,
    price,
    chat,
    interest,
    view,
    interestChecked,
    postedAt,
    images,
  } = details;

  const newDetails = {
    itemIdx,
    title,
    seller,
    status,
    category: { idx: category.categoryIdx, text: category.categoryName },
    description,
    price,
    chat,
    interest,
    view,
    interestChecked,
    postedAt: new Date(postedAt),
    images,
  };
  return newDetails;
};

export const getItemDetailAPI = async (
  itemIdx: number
): Promise<Response<ItemDetail | null>> => {
  if (isNaN(itemIdx)) return { error: new Error(ERROR_MESSAGE[400]) };
  try {
    const res = (await customFetch<null, APIItemDetail>({
      path: `/items/${itemIdx}`,
      method: 'GET',
    })) as Response<APIItemDetail>;

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    const details = res.data;

    return {
      ...res,
      data: convertAPIItemDetailsToItemDetails(details),
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return { error: undefined, data: null };
  }
};

const convertItemReqBodyToAPIReqBody = (body: ItemReqBody): APIItemReqBody => {
  const { title, price, contents, locationIdx, categoryIdx, images } = body;

  const imageFiles = images.map((image) => image.file);

  const newItem: APIItemReqBody = {
    title,
    price: price === null ? '0' : price.toString(),
    description: contents,
    locationIdx: locationIdx
      ? locationIdx.toString()
      : LOCATION_FALLBACK.locationIdx.toString(),
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

export const editItemsAPI = async (itemIdx: number, body: ItemReqBody) => {
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
    const res = await customFetch<FormData, null>({
      path: `/items/${itemIdx}`,
      method: 'PATCH',
      body: formData,
    });
    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    return {
      data: null,
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};

export const convertDataToBody = (
  title: string,
  contents: string,
  images: Image[],
  price: number,
  categoryIdx: number,
  locationIdx: number
) => {
  const body = {
    title,
    contents,
    images,
    price,
    categoryIdx,
    locationIdx: locationIdx ?? LOCATION_FALLBACK.locationIdx,
  };
  return body;
};

export const getRandomCategories = (categories: Category[]) => {
  if (categories) return getRandomElements(categories, 3);
  else return [];
};

export const deleteItemsAPI = async (itemIdx: number) => {
  try {
    const res = await customFetch<FormData, null>({
      path: `/items/${itemIdx}`,
      method: 'DELETE',
    });
    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    return {
      data: null,
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};

export const getSalesItemsAPI = async (status: ItemStatus) => {
  const queries = removeEmptyKeyValues({
    status,
  });

  try {
    const res = (await customFetch<null, GetSalesItemsRes>({
      path: '/members/items',
      method: 'GET',
      queries,
      auth: true,
    })) as Response<GetSalesItemsRes>;
    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    const items = res.data;
    return {
      ...res,
      data: convertAPISalesItemsToListItems(items),
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};

export const convertAPISalesItemsToListItems = (
  items: APISalesItem[]
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
      like,
      interestChecked,
    } = item;

    const newItem: ListItemPropsWithId = {
      id: itemIdx,
      title: name,
      imgUrl: imageUrl,
      location: location,
      timeStamp: new Date(postedAt),
      price: price,
      state: status,
      like,
      chat: chat,
      moreBtn: false,
      interestChecked,
    };
    return newItem;
  });
};
