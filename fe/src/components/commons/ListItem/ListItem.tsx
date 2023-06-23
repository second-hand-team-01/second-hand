import { useRef } from 'react';
import * as S from './ListItemStyle';
import icons from '@assets/icons';
import { Icon } from '@components/commons';
import { colors, palette } from '@styles/Color';
import {
  convertDateToTimeStamp,
  convertNumToPrice,
} from '@utils/common/common';

export interface IconProps {
  name: keyof typeof icons;
  size: number;
  color: keyof typeof palette | keyof typeof colors;
}

export interface ListItemProps {
  title: string;
  imgUrl: string;
  location: string;
  timeStamp: Date;
  price: number | null;
  state: '예약중' | '판매중' | null;
  like: number | null;
  chat: number | null;
  moreBtn: boolean;
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

export const ListItem = ({
  title,
  imgUrl,
  location,
  timeStamp,
  state,
  price,
  like,
  chat,
  moreBtn,
  onClick,
}: ListItemProps) => {
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  const moreBtnClickHandler = () => {
    console.log('더보기 버튼 클릭');
  };

  return (
    <S.ListItem onClick={onClick}>
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
                  name={heartIcon.name}
                  size={heartIcon.size}
                  color={heartIcon.color}
                />
                <span>{like}</span>
              </S.ChatAndLikeInfo>
            )}
          </S.ChatAndLike>
        </S.Content>
      </S.Wrap>
    </S.ListItem>
  );
};
