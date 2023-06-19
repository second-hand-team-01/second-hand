import { Item } from '@type-store/items';
import { ListItemProps } from '@commons/ListItem/ListItem';

interface ListItemPropsWithId extends ListItemProps {
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
