import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
  Carousel,
} from '@commons/index';
import {
  getItemDetailAPI,
  deleteItemsAPI,
  changeStatusItemsAPI,
} from '@services/items/items';
import { convertDateToTimeStamp } from '@utils/common/common';
import { ItemDetail } from '@type-store/services/items';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '@stores/UserContext';
import { postFavoriteItemAPI } from '@services/items/favoriteItems';
import { MenuButtonProps } from '@components/commons/Menu/MenuStyle';
import { getAllLocationDataAPI } from '@services/locations/locations';

export const DetailsPage = () => {
  const userInfo = useContext(UserInfoContext);

  const param = useParams();
  const itemIdxStr = param.itemIdx;
  const navigate = useNavigate();
  const { prevPathname, itemLocation } = useLocation().state;

  const [details, setDetails] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [isInterestChecked, setInterestChecked] = useState(false);
  const [menuButtonPropsList, setMenuButtonPropsList] = useState<
    MenuButtonProps[]
  >([]);

  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );

  useEffect(() => {
    (async () => {
      !loading && setLoading(true);
      const { data: itemData, error: itemError } = await getItemDetailAPI(
        Number(itemIdxStr)
      );
      if (itemError) return setErrorMsg(itemError.message);
      if (itemData) {
        setDetails((prevDetails) => ({
          ...prevDetails,
          ...itemData,
        }));
        setInterestChecked(itemData.interestChecked);
      }

      const { data: locationData, error: locationError } =
        await getAllLocationDataAPI();
      if (locationError) return setErrorMsg(locationError.message);
      if (locationData && Array.isArray(locationData)) {
        const location = locationData.find(
          (location) => location.town === itemLocation
        );

        setDetails((prevDetails) => {
          if (prevDetails === null) {
            return null;
          }
          return {
            ...prevDetails,
            location: {
              locationIdx: location?.locationIdx,
              locationName: location?.town,
            },
          };
        });
      }
      setLoading(false);
    })();
  }, []);

  const isWriter = userInfo?.memberIdx === details?.seller.memberIdx;

  const handleChatClicked = () => {
    if (isWriter) {
      return navigate(`/chat/${itemIdxStr}`);
    }
    navigate(`/chat/${itemIdxStr}/${details?.seller.memberIdx ?? 0}`, {
      state: {
        user: {
          memberIdx: details?.seller.memberIdx,
          imgUrl: details?.seller.memberProfileImage,
          name: details?.seller.memberId,
        },
        salesInfo: {
          previewImg: details?.images?.[0],
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
      setDetails((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          interest: prev.interest + 1,
        };
      });
      return;
    }
    if (icon?.id === 'heartFill') {
      const { error } = await postFavoriteItemAPI({
        itemIdx,
        interestChecked: false,
      });
      if (error) return;
      setInterestChecked(false);
      setDetails((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          interest: prev.interest - 1,
        };
      });
      return;
    }
  };

  useEffect(() => {
    const menuOptions: { [key: string]: MenuButtonProps } = {
      ['판매중']: {
        shape: 'small',
        state: 'default',
        color: 'neutralText',
        name: '판매중 상태로 전환',
        onClick: async () => {
          changeStatusItemsAPI(Number(itemIdxStr), {
            title: details?.title,
            description: details?.description,
            images: details?.images,
            price: details?.price,
            categoryIdx: details?.category.idx,
            locationIdx: details?.location?.locationIdx,
            status: '판매중',
          });
          setDetails((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              status: '판매중',
            };
          });
          setStatusDropdownOpen(false);
        },
      },
      ['판매완료']: {
        shape: 'small',
        state: 'default',
        color: 'neutralText',
        name: '판매 완료 상태로 전환',
        onClick: () => {
          changeStatusItemsAPI(Number(itemIdxStr), {
            title: details?.title,
            description: details?.description,
            images: details?.images,
            price: details?.price,
            categoryIdx: details?.category.idx,
            locationIdx: details?.location?.locationIdx,
            status: '판매완료',
          });
          setDetails((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              status: '판매완료',
            };
          });
          setStatusDropdownOpen(false);
        },
      },
      ['예약중']: {
        shape: 'small',
        state: 'default',
        color: 'neutralText',
        name: '예약중 상태로 전환',
        onClick: () => {
          changeStatusItemsAPI(Number(itemIdxStr), {
            title: details?.title,
            description: details?.description,
            images: details?.images,
            price: details?.price,
            categoryIdx: details?.category.idx,
            locationIdx: details?.location?.locationIdx,
            status: '예약중',
          });
          setDetails((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              status: '예약중',
            };
          });
          setStatusDropdownOpen(false);
        },
      },
    };

    const statusMenuList: MenuButtonProps[] = [];

    Object.entries(menuOptions).forEach((option) => {
      const [key, value] = option;
      if (details?.status !== key) {
        statusMenuList.push(value);
      }
    });
    setMenuButtonPropsList(statusMenuList);
  }, [details]);

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          leftBtn: (
            <NavbarBtn
              icon="arrowLeft"
              path={prevPathname}
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
            {isMobileDevice && <Slide urls={details?.images ?? []} />}
            {!isMobileDevice && <Carousel urls={details?.images ?? []} />}
          </S.ImageContainer>
          <S.Contents>
            <S.WriterSection>
              <p>판매자 정보</p>
              <p>{details?.seller.memberId}</p>
            </S.WriterSection>
            {isWriter && (
              <S.StatusSection>
                <Dropdown
                  menuButtonPropsList={menuButtonPropsList}
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
            onClick: () =>
              navigate(`/edit/${itemIdxStr}`, {
                state: {
                  prevPathname: prevPathname,
                  itemLocation: itemLocation,
                  itemStatus: details?.status,
                },
              }),
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
              const { error } = await deleteItemsAPI(Number(itemIdxStr));
              if (error) return setErrorDialogOpen(true);
              setMenuOpen(false);
              navigate(prevPathname);
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
