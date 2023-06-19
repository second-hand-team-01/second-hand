import { useData } from '@hooks/useData/useData';
import { ListItem } from '@commons/index';
import { convertItemsToListItems } from '@services/items/items';
import { Item } from '@type-store/items';
import * as S from './HomeStyle';

interface getItemsAPIResponse {
  hasNext: boolean;
  items: Item[];
}

export const Home = () => {
  const data = useData<getItemsAPIResponse, null>({
    path: '/items',
    method: 'GET',
  });
  const items = data ? data.items : null;
  const convertedItems = items ? convertItemsToListItems(items) : null;

  return convertedItems ? (
    <S.Home>
      {convertedItems.map((item) => (
        <ListItem key={item.id} {...item}></ListItem>
      ))}
    </S.Home>
  ) : (
    <></>
  );
};
