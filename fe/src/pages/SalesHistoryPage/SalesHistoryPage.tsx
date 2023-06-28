import * as S from './SalesHistoryPageStyle';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, ListItem, Loading, Menu } from '@components/commons';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getSalesItemsAPI } from '@services/items/items';
import { ItemStatus } from '@type-store/services/items';
import { ListItemProps } from '@commons/ListItem/ListItem';
import { Error } from '@commons/index';
import { ERROR_MESSAGE } from '@constants/error';

export const SalesHistoryPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ItemStatus>('판매중');
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
    return salesItems.map((item: ListItemProps) => (
      <ListItem
        key={item.itemIdx}
        {...item}
        moreBtn={true}
        onClick={() => {
          console.log('click');
          navigate(`/item/${item.itemIdx}`);
        }}
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
              { name: '판매중', id: '판매중' },
              { name: '판매완료', id: '판매완료' },
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
