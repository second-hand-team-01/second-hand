import * as S from './SalesHistoryPageStyle';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, ListItem } from '@components/commons';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getSalesItemsAPI } from '@services/items/items';
import { ItemStatus, ListItemPropsWithId } from '@type-store/services/items';
import { Error } from '@commons/index';

export const SalesHistoryPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ItemStatus>(ItemStatus.SELLING);
  const [state, fetch] = useFetch(getSalesItemsAPI.bind(null, status), []);

  useEffect(() => {
    fetch();
  }, [status]);

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: '판매 내역',
          tabInfo: {
            onClick: ({ currentTarget }) => {
              setStatus(currentTarget.id as ItemStatus);
            },
            activeId: status,
            options: [
              { name: '판매중', id: ItemStatus.SELLING },
              { name: '판매완료', id: ItemStatus.SOLD },
            ],
          },
        },
      }}
      footerOption={{ type: 'tab' }}
    >
      <S.SalesHistoryPage>
        {state.data ? (
          state.data.map((item: ListItemPropsWithId) => (
            <ListItem
              key={item.id}
              {...item}
              onClick={() => navigate(`/item/${item.id}`)}
            ></ListItem>
          ))
        ) : (
          <Error>아무것도 없어요</Error>
        )}
      </S.SalesHistoryPage>
    </Layout>
  );
};
