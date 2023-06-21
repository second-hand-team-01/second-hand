import { Item } from '@type-store/services/items';
import { ListItemProps } from '@commons/ListItem/ListItem';
import { customFetch } from '@services/apis/apis';
import { Response } from '@hooks/useFetch/useFetch';
import { useState } from 'react';

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
