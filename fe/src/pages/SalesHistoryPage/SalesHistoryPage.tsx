import * as S from './SalesHistoryPageStyle';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Layout, ListItem, Loading } from '@components/commons';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getSalesItemsAPI } from '@services/items/items';
import { ItemStatus } from '@type-store/services/items';
import { ListItemProps } from '@commons/ListItem/ListItem';
import { Error } from '@commons/index';
import { UserInfoContext } from '@stores/UserContext';

export const SalesHistoryPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [status, setStatus] = useState<ItemStatus>('판매중');
  const [{ data, error, loading }, fetch] = useFetch(
    getSalesItemsAPI.bind(null, status),
    []
  );

  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    fetch();
  }, [status, userInfo?.isLoggedIn]);

  const renderComps = () => {
    if (userInfo?.isLoggedIn === false) {
      return <Navigate to="/profile" replace />;
    }
    if (loading) {
      return <Loading></Loading>;
    }
    if (error || !data || !data.items) {
      return <Error>{error?.message}</Error>;
    }
    if (data.items.length === 0 && status === '판매중') {
      return (
        <Error button="상품 등록하기" onClick={() => navigate('/write')}>
          아직 등록된 판매 상품이 없어요.
        </Error>
      );
    }

    if (data.items.length === 0 && status === '판매완료') {
      return <Error>아직 판매 완료된 상품이 없어요.</Error>;
    }

    return data?.items.map((item: ListItemProps) => (
      <ListItem
        key={item.itemIdx}
        {...item}
        moreBtn={true}
        onClick={() => {
          navigate(`/item/${item.itemIdx}`, { state: pathname });
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
