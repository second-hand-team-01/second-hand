import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as S from './DetailsPageStyle';
import {
  Layout,
  NavbarBtn,
  Slide,
  Dropdown,
  Loading,
  Error,
  Button,
  Menu,
} from '@commons/index';
import { getItemDetailAPI } from '@services/items/items';
import { convertDateToTimeStamp } from '@utils/common/common';
import { ItemDetail } from '@type-store/services/items';

export const DetailsPage = () => {
  const userId = 'snoopso'; // todo

  const param = useParams();
  const itemIdx = param.itemIdx;

  const [details, setDetails] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      !loading && setLoading(true);
      const { data, error } = await getItemDetailAPI(Number(itemIdx));
      if (error) return setErrorMsg(error.message);
      if (data) {
        setDetails(data);
      }
      setLoading(false);
    })();
  }, []);

  const isWriter = userId === details?.sellerId;

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
          rightBtn: (
            <Button
              icon="more"
              shape="ghost"
              isWidthFitContent={true}
              color="accentText"
              onClick={() => setMenuOpen(true)}
            ></Button>
          ),
          isTransparent: true,
        },
      }}
      footerOption={{
        type: 'info',
        infoBarOptions: {
          isInterestedChecked: details?.interestChecked,
          price: details?.price,
          handleInterestClicked: () => console.log('d'),
          handleChatClicked: () => console.log('d'),
        },
      }}
      isHeaderOverlapped={true}
    >
      {errorMsg ? (
        <Error>{errorMsg}</Error>
      ) : loading ? (
        <Loading />
      ) : (
        <S.DetailsPages className="detail">
          <S.ImageContainer>
            <Slide urls={details?.images ?? []}></Slide>
          </S.ImageContainer>
          <S.Contents>
            <S.WriterSection>
              <p>판매자 정보</p>
              <p>{details?.sellerId}</p>
            </S.WriterSection>
            {isWriter && (
              <Dropdown isOpen={false} onClick={() => console.log('d')}>
                {details?.status ?? ''}
              </Dropdown>
            )}
            <S.Title>{details?.title}</S.Title>
            <S.Info>
              <span>{details?.category}</span>
              <span>・</span>
              <span>
                {details?.postedAt && convertDateToTimeStamp(details?.postedAt)}
              </span>
            </S.Info>
            <S.Description>{details?.description}</S.Description>
            <S.Info>채팅 {details?.chat}</S.Info>
            <S.Info>관심 {details?.interest}</S.Info>
            <S.Info>조회 {details?.view}</S.Info>
          </S.Contents>
        </S.DetailsPages>
      )}
      <Menu
        location="bottom"
        menuButtonPropsList={[
          {
            shape: 'small',
            state: 'default',
            color: 'neutralText',
            name: '안녕',
            onClick: () => console.log('d'),
          },
        ]}
        openState={[menuOpen, setMenuOpen]}
      ></Menu>
    </Layout>
  );
};
