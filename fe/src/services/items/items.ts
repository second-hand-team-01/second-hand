import {
  APIItemReqBody,
  Item,
  ItemReqBody,
  PostItemRes,
  GetItemsRes,
  ItemDetail,
  APIItemDetail,
  WriteItemDetails,
  ItemStatus,
  APISalesItem,
} from '@type-store/services/items';
import { ListItemProps } from '@commons/ListItem/ListItem';

import { customFetch } from '@services/apis/apis';
import { Response } from '@hooks/useFetch/useFetch';
import { ERROR_MESSAGE } from '@constants/error';
import { Image, GetSalesItemsRes } from '@type-store/services/items';
import { Category } from '@type-store/services/category';
import { getRandomElements, removeEmptyKeyValues } from '@utils/common/common';
import { LOCATION_FALLBACK } from '@constants/login';

export const convertItemsToListItems = (items: Item[]): ListItemProps[] => {
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

    const newItem: ListItemProps = {
      itemIdx,
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
  let path = '/items';
  const queries = removeEmptyKeyValues({
    page,
    locationIdx,
  });

  if (categoryIdx) {
    path = path + `/category/${categoryIdx}`;
  }

  queries['locationIdx'] = locationIdx ?? LOCATION_FALLBACK.locationIdx;

  try {
    const res = (await customFetch<null, GetItemsRes>({
      path,
      method: 'GET',
      queries,
      auth: true,
    })) as Response<GetItemsRes>;

    if (!res || !res.data || res.error) {
      return { error: res.error, data: undefined };
    }
    const { hasNext, items } = res.data;
    return {
      ...res,
      data: {
        hasNext,
        items: convertItemsToListItems(items) as ListItemProps[],
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
    return { file: null, fileString: image, size: -1, name: '' };
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
    name,
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
    imageUrl,
  } = details;

  const newDetails = {
    itemIdx,
    title: name,
    seller: {
      memberIdx: seller.sellerIdx,
      memberId: seller.sellerId,
      memberProfileImage: seller.sellerProfileImage,
    },
    status,
    category: { idx: category.idx, text: category.name },
    description,
    price,
    chat,
    interest,
    view,
    interestChecked,
    postedAt: new Date(postedAt),
    images: imageUrl,
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

  const imageFiles = images.map((image) => image.file) as File[] | null;

  const newItem: APIItemReqBody = {
    name: title,
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
  formData.append('name', convertedBody.name);
  formData.append('description', convertedBody.description);
  formData.append('price', convertedBody.price);
  formData.append('locationIdx', convertedBody.locationIdx);
  formData.append('categoryIdx', convertedBody.categoryIdx);
  convertedBody.images?.forEach((image) => {
    formData.append(`image`, image);
  });

  try {
    const res = (await customFetch<FormData, PostItemRes>({
      path: '/items',
      method: 'POST',
      auth: true,
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
  formData.append('name', convertedBody.name);
  formData.append('description', convertedBody.description);
  formData.append('price', convertedBody.price);
  formData.append('locationIdx', convertedBody.locationIdx);
  formData.append('categoryIdx', convertedBody.categoryIdx);
  convertedBody.images?.forEach((image, i) => {
    formData.append(`image${i}`, image);
  });

  try {
    const res = await customFetch<FormData, null>({
      path: `/items/${itemIdx}`,
      method: 'PUT',
      auth: true,
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
      auth: true,
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
  const queries = {
    status: 'sell',
  };
  if (status === '판매완료') {
    queries.status = 'sold';
  }
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
    const { hasNext, items } = res.data;
    return {
      ...res,
      data: { hasNext, items: convertAPISalesItemsToListItems(items) },
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    return {};
  }
};

export const convertAPISalesItemsToListItems = (
  items: APISalesItem[]
): ListItemProps[] => {
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

    const newItem: ListItemProps = {
      itemIdx,
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

export const changeStatusItemsAPI = async (
  itemIdx: number,
  status: ItemStatus
) => {
  if (!status) return { error: { message: ERROR_MESSAGE.FILE_UPLOAD_ERROR } };
  const formData = new FormData();
  formData.append('status', status);

  try {
    const res = await customFetch<FormData, null>({
      path: `/items/${itemIdx}`,
      method: 'PUT',
      auth: true,
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
