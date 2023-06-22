import { useState, useReducer, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import * as S from './DetailsPageStyle';
import {
  NavBar,
  Button,
  TextInput,
  Profile,
  Layout,
  NavbarBtn,
  Slide,
  Dropdown,
} from '@commons/index';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getItemDetailAPI } from '@services/items/items';
import {
  convertDateToTimeStamp,
  convertNumToPrice,
} from '@utils/common/common';
import { ItemDetail } from '@type-store/services/items';

export const DetailsPage = () => {
  const navigate = useNavigate();
  const userId = 'snoopso'; // todo

  const param = useParams();
  const itemIdx = param.itemIdx;

  const [detailsState, fetch] = useFetch<ItemDetail, any>(
    getItemDetailAPI.bind(null, Number(itemIdx)),
    [],
    true
  );

  const { data, loading } = detailsState;

  const isWriter = userId === data?.sellerId;

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          leftBtn: (
            <NavbarBtn
              icon="arrowLeft"
              path="back"
              color="accentText"
            ></NavbarBtn>
          ),
          rightBtn: <NavbarBtn icon="more" color="accentText"></NavbarBtn>,
          isTransparent: true,
        },
      }}
      footerOption={{
        type: 'info',
        infoBarOptions: {
          isInterestedChecked: data?.interestChecked,
          price: data?.price,
          handleInterestClicked: () => console.log('d'),
          handleChatClicked: () => console.log('d'),
        },
      }}
      isHeaderOverlapped={true}
    >
      <S.DetailsPages className="detail">
        {loading ? (
          <>로딩중</>
        ) : (
          <>
            <Slide urls={data?.images ?? []}></Slide>
            <S.Contents>
              <S.WriterSection>
                <p>판매자 정보</p>
                <p>{data?.sellerId}</p>
              </S.WriterSection>
              {isWriter && (
                <Dropdown isOpen={false} onClick={() => console.log('d')}>
                  {data?.status ?? ''}
                </Dropdown>
              )}
              <S.Title>{data?.title}</S.Title>
              <S.Info>
                <span>{data?.category}</span>
                <span>・</span>
                <span>
                  {data?.postedAt && convertDateToTimeStamp(data?.postedAt)}
                </span>
              </S.Info>
              <S.Description>{data?.description}</S.Description>
              <S.Info>채팅 {data?.chat}</S.Info>
              <S.Info>관심 {data?.interest}</S.Info>
              <S.Info>조회 {data?.view}</S.Info>
            </S.Contents>
          </>
        )}
      </S.DetailsPages>
    </Layout>
  );
};
