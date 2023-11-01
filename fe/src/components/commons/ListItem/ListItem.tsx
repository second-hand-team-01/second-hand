import { useRef, useState } from 'react';
import * as S from './ListItemStyle';
import icons from '@assets/icons';
import { Icon, Menu, Dialog } from '@components/commons';
import { colors, palette } from '@styles/Color';
import {
  convertDateToTimeStamp,
  convertNumToPrice,
} from '@utils/common/common';
import { useNavigate } from 'react-router-dom';
import { changeStatusItemsAPI } from '@services/items/items';
import { MenuButtonProps } from '../Menu/MenuStyle';
import { deleteItemsAPI } from '@services/items/items';
import { URL } from '@constants/apis';

export interface IconProps {
  name: keyof typeof icons;
  size: number;
  color: keyof typeof palette | keyof typeof colors;
}

export interface ListItemProps {
  itemIdx: number;
  title: string;
  imgUrl: string;
  location: string;
  timeStamp: Date;
  price: number | null;
  state: '예약중' | '판매중' | string | null;
  like: number | null | undefined;
  chat: number | null;
  moreBtn: boolean;
  interestChecked: boolean;
  onClick?: () => void;
}

const moreBtnIcon: IconProps = {
  name: 'more',
  size: 15,
  color: 'neutralTextWeak',
};
const chatIcon: IconProps = {
  name: 'talk',
  size: 13,
  color: 'neutralText',
};
const heartIcon: IconProps = {
  name: 'heart',
  size: 13,
  color: 'neutralText',
};

const heartFillIcon: IconProps = {
  name: 'heartFill',
  size: 13,
  color: 'neutralText',
};

export const ListItem = ({
  itemIdx,
  title,
  imgUrl,
  location,
  timeStamp,
  state,
  price,
  like,
  chat,
  moreBtn,
  interestChecked,
  onClick,
}: ListItemProps) => {
  const navigate = useNavigate();
  const listItemRef = useRef<HTMLLIElement>(null);

  const moreBtnRef = useRef<HTMLButtonElement>(null);

  // const [interestChecked, setInterestChecked] = useState(
  //   initialInterestChecked
  // );
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);

  const moreBtnClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(true);
  };

  const handleBtnClick = async (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const currentTargetElement = e.currentTarget as HTMLLIElement;
    const icon = targetElement.closest('svg');
    const itemIdx = parseInt(currentTargetElement.id);
    if (!itemIdx) return;
    if (icon?.id === 'more') {
      moreBtnClickHandler(e);
      return;
    }

    if (
      targetElement.classList.contains('backdrop') ||
      targetElement.classList.contains('menu-button')
    ) {
      return;
    }

    onClick && onClick();
  };

  const menuOptions: { [key: string]: MenuButtonProps } = {
    ['판매중']: {
      shape: 'large',
      state: 'default',
      color: 'systemDefault',
      name: '판매중 상태로 전환',
      onClick: () => {
        changeStatusItemsAPI(itemIdx, '판매중');
        setMenuOpen(false);
        window.location.assign(URL + '/sales-history');
      },
    },
    ['판매완료']: {
      shape: 'large',
      state: 'default',
      color: 'systemDefault',
      name: '판매 완료 상태로 전환',
      onClick: () => {
        changeStatusItemsAPI(itemIdx, '판매완료');
        setMenuOpen(false);
        window.location.assign(URL + '/sales-history');
      },
    },
    ['예약중']: {
      shape: 'large',
      state: 'default',
      color: 'systemDefault',
      name: '예약중 상태로 전환',
      onClick: () => {
        changeStatusItemsAPI(itemIdx, '예약중');
        setMenuOpen(false);
        window.location.assign(URL + '/sales-history');
      },
    },
  };

  const duplicatedMenuOptions = { ...menuOptions };
  if (state) {
    delete duplicatedMenuOptions[state];
  }

  const menuButtonPropsList: MenuButtonProps[] = [
    {
      shape: 'large',
      state: 'default',
      color: 'systemDefault',
      name: '게시글 수정',
      onClick: () => navigate(`/edit/${itemIdx}`),
    },
    ...Object.values(duplicatedMenuOptions),
    {
      shape: 'large',
      state: 'default',
      color: 'systemWarning',
      name: '삭제',
      onClick: async () => {
        const { error } = await deleteItemsAPI(Number(itemIdx));
        if (error) return setErrorDialogOpen(true);
        setMenuOpen(false);
      },
    },
  ];

  return (
    <S.ListItem onClick={handleBtnClick} id={String(itemIdx)} ref={listItemRef}>
      <S.Wrap>
        <S.Thumbnail src={imgUrl} alt={title} />
        <S.Content>
          <S.Info>
            <S.Title>
              <span>{title}</span>
              {moreBtn && (
                <button ref={moreBtnRef} onClick={moreBtnClickHandler}>
                  <Icon
                    name={moreBtnIcon.name}
                    size={moreBtnIcon.size}
                    color={moreBtnIcon.color}
                  />
                </button>
              )}
            </S.Title>
            <S.SubInfo>
              <span>{location}</span>
              <span> ・ </span>
              <span>{convertDateToTimeStamp(timeStamp)}</span>
            </S.SubInfo>
            <S.States>
              {state === '예약중' && <S.StateBadge>{state}</S.StateBadge>}
              {price ? `${convertNumToPrice(price)}원` : '가격 없음'}
            </S.States>
          </S.Info>
          <S.ChatAndLike>
            {!!chat && (
              <S.ChatAndLikeInfo>
                <Icon
                  name={chatIcon.name}
                  size={chatIcon.size}
                  color={chatIcon.color}
                />
                <span>{chat}</span>
              </S.ChatAndLikeInfo>
            )}
            {!!like && (
              <S.ChatAndLikeInfo>
                <Icon
                  name={interestChecked ? heartFillIcon.name : heartIcon.name}
                  size={interestChecked ? heartFillIcon.size : heartIcon.size}
                  color={
                    interestChecked ? heartFillIcon.color : heartIcon.color
                  }
                />
                <span className="like-counts">{like}</span>
              </S.ChatAndLikeInfo>
            )}
          </S.ChatAndLike>
        </S.Content>
      </S.Wrap>
      <Menu
        location="bottom"
        menuButtonPropsList={menuButtonPropsList}
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
    </S.ListItem>
  );
};
