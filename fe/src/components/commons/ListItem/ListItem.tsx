import { useRef, useState } from 'react';
import * as S from './ListItemStyle';
import icons from '@assets/icons';
import { Icon } from '@components/commons';
import { colors, palette } from '@styles/Color';
import {
  convertDateToTimeStamp,
  convertNumToPrice,
} from '@utils/common/common';
import { postFavoriteItemAPI } from '@services/items/favoriteItems';

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
  like: number | null;
  chat: number | null;
  moreBtn: boolean;
  interestChecked: boolean;
  onClick?: () => void;
  setUpdateFlag?: React.Dispatch<React.SetStateAction<boolean>>;
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
  interestChecked: initialInterestChecked,
  onClick,
  setUpdateFlag,
}: ListItemProps) => {
  const listItemRef = useRef<HTMLLIElement>(null);

  const moreBtnRef = useRef<HTMLButtonElement>(null);

  const [interestChecked, setInterestChecked] = useState(
    initialInterestChecked
  );

  const handleBtnClick = async (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const currentTargetElement = e.currentTarget as HTMLLIElement;
    const icon = targetElement.closest('svg');
    const itemIdx = parseInt(currentTargetElement.id);
    if (!itemIdx) return;
    if (icon?.id === 'heart') {
      const { error } = await postFavoriteItemAPI({
        itemIdx,
        interestChecked: true,
      });
      if (error) return;
      setInterestChecked(true);
      setUpdateFlag && setUpdateFlag(true);
      return;
    }
    if (icon?.id === 'heartFill') {
      const { error } = await postFavoriteItemAPI({
        itemIdx,
        interestChecked: false,
      });
      if (error) return;
      setInterestChecked(false);
      setUpdateFlag && setUpdateFlag(true);
      return;
    }
    if (icon?.id === 'more') {
      return;
    }

    onClick && onClick();
  };

  const moreBtnClickHandler = () => {
    console.log('더보기 버튼 클릭');
  };

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
    </S.ListItem>
  );
};
