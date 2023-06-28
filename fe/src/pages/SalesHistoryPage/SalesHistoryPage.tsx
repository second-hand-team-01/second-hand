import * as S from './SalesHistoryPageStyle';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, ListItem, Loading } from '@components/commons';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getSalesItemsAPI } from '@services/items/items';
import { ItemStatus, ListItemPropsWithId } from '@type-store/services/items';
import { Error } from '@commons/index';
import { ERROR_MESSAGE } from '@constants/error';

export const SalesHistoryPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ItemStatus>(ItemStatus.SELLING);
  const [{ data: salesItems, error, loading }, fetch] = useFetch(
    getSalesItemsAPI.bind(null, status),
    []
  );

  useEffect(() => {
    fetch();
  }, [status]);

  const renderComps = () => {
    if (loading) {
      return <Loading></Loading>;
    }
    if (error || !salesItems) {
      return <Error>{error?.message}</Error>;
    }
    if (salesItems.length === 0) {
      return <Error>{ERROR_MESSAGE.NO_DATA}</Error>;
    }
    return salesItems.map((item: ListItemPropsWithId) => (
      <ListItem
        key={item.id}
        {...item}
        onClick={() => navigate(`/item/${item.id}`)}
      ></ListItem>
    ));
  };

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
      <S.SalesHistoryPage>{renderComps()}</S.SalesHistoryPage>
    </Layout>
  );
};
