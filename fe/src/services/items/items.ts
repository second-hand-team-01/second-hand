import { Item } from '@type-store/items';
import { ListItemProps } from '@commons/ListItem/ListItem';
import { customFetch } from '@services/apis/apis';

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

export const getItemsAPI = async (page: number) => {
  try {
    const fetchedData = await customFetch({
      path: '/items',
      method: 'GET',
      queries: { page },
    });
    if (fetchedData && fetchedData.error) {
      console.error(`Error: ${fetchedData.error}`);
      return null;
    }
    return fetchedData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
};
