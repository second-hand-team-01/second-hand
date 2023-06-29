import { useState, useEffect, useContext } from 'react';
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
  Dialog,
} from '@commons/index';
import { getItemDetailAPI, deleteItemsAPI } from '@services/items/items';
import { convertDateToTimeStamp } from '@utils/common/common';
import { ItemDetail } from '@type-store/services/items';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@stores/UserContext';
import { DEV_USER } from '@constants/login';
import { postFavoriteItemAPI } from '@services/items/favoriteItems';

export const DetailsPage = () => {
  const { userInfo, dispatch } = useContext(UserContext);

  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      dispatch({
        type: 'SET_USER',
        payload: {
          memberIdx: DEV_USER.memberIdx,
          loginId: DEV_USER.memberId,
          imgUrl: null,
        },
      });
    }, []);
  }

  const param = useParams();
  const itemIdx = param.itemIdx;
  const navigate = useNavigate();

  const [details, setDetails] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [isInterestChecked, setInterestChecked] = useState(false);

  useEffect(() => {
    (async () => {
      !loading && setLoading(true);
      const { data, error } = await getItemDetailAPI(Number(itemIdx));
      if (error) return setErrorMsg(error.message);
      if (data) {
        setDetails(data);
        details && setInterestChecked(details.interestChecked);
      }
      setLoading(false);
    })();
  }, []);

  const isWriter = userInfo.memberIdx === details?.seller.memberIdx;

  const handleChatClicked = () => {
    if (isWriter) {
      return navigate(`/chat/${itemIdx}`);
    }
    navigate(`/chat/${itemIdx}/0`, {
      state: {
        user: {
          memberIdx: details?.seller.memberId,
          imgUrl: '',
          name: details?.seller.memberId,
        },
        salesInfo: {
          previewImg: details?.images[0],
          price: details?.price,
          title: details?.title,
        },
      },
    });
  };

  const handleInterestBtn = async (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const icon = targetElement.closest('svg');
    const itemIdx = details?.itemIdx;
    if (!itemIdx || !icon) return;
    if (icon?.id === 'heart') {
      const { error } = await postFavoriteItemAPI({
        itemIdx,
        interestChecked: true,
      });
      if (error) return;
      setInterestChecked(true);
      return;
    }
    if (icon?.id === 'heartFill') {
      const { error } = await postFavoriteItemAPI({
        itemIdx,
        interestChecked: false,
      });
      if (error) return;
      setInterestChecked(false);
      return;
    }
  };

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
          rightBtn: isWriter ? (
            <Button
              icon="more"
              shape="ghost"
              isWidthFitContent={true}
              color="accentText"
              backgroundColor="transparent"
              onClick={() => {
                setMenuOpen(true);
              }}
            ></Button>
          ) : (
            <></>
          ),
          isTransparent: true,
        },
      }}
      footerOption={{
        type: 'info',
        infoBarOptions: {
          isInterestedChecked: isInterestChecked,
          price: details?.price,
          handleInterestClicked: handleInterestBtn,
          handleChatClicked: handleChatClicked,
          isWriter,
          chat: details?.chat,
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
              <p>{details?.seller.memberId}</p>
            </S.WriterSection>
            {isWriter && (
              <S.StatusSection>
                <Dropdown
                  menuButtonPropsList={[
                    {
                      shape: 'small',
                      state: 'default',
                      name: 'ddd',
                      onClick: () => setStatusDropdownOpen(false),
                    },
                    {
                      shape: 'small',
                      state: 'default',
                      name: 'ddd2',
                      onClick: () => setStatusDropdownOpen(false),
                    },
                  ]}
                  openState={[isStatusDropdownOpen, setStatusDropdownOpen]}
                  onClick={() => setStatusDropdownOpen(true)}
                  hasBorder={true}
                  size="small"
                >
                  {details?.status ?? ''}
                </Dropdown>
              </S.StatusSection>
            )}
            <S.Title>{details?.title}</S.Title>
            <S.Info>
              <span>{details?.category.text}</span>
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
            shape: 'large',
            state: 'default',
            color: 'systemDefault',
            name: '게시글 수정',
            onClick: () => navigate(`/edit/${itemIdx}`),
          },
          {
            shape: 'large',
            state: 'default',
            color: 'systemWarning',
            name: '삭제',
            onClick: () => setDeleteDialogOpen(true),
          },
        ]}
        openState={[menuOpen, setMenuOpen]}
      ></Menu>
      <Dialog
        isOpen={isDeleteDialogOpen}
        btnInfos={{
          left: {
            text: '취소',
            onClick: () => {
              setDeleteDialogOpen(false);
              setMenuOpen(false);
            },
          },
          right: {
            text: '삭제',
            onClick: async () => {
              const { error } = await deleteItemsAPI(Number(itemIdx));
              if (error) return setErrorDialogOpen(true);
              setMenuOpen(false);
              navigate('/');
            },
            color: 'systemWarning',
          },
        }}
        handleBackDropClick={() => {
          setDeleteDialogOpen(false);
          setMenuOpen(false);
        }}
      >
        정말 삭제하시겠어요?
      </Dialog>
      <Dialog
        isOpen={isErrorDialogOpen}
        btnInfos={{
          right: {
            text: '확인',
            onClick: async () => {
              setErrorDialogOpen(false);
              setMenuOpen(false);
            },
          },
        }}
        handleBackDropClick={() => {
          setErrorDialogOpen(false);
          setMenuOpen(false);
        }}
      >
        에러가 발생했습니다.
      </Dialog>
    </Layout>
  );
};
