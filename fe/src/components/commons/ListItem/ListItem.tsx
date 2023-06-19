import { useRef, MouseEvent } from 'react';
import * as S from './ListItemStyle';
import { icons } from '@assets/icons';
import { Icon } from '@components/commons';
import { colors, palette } from '@styles/Color';
import { convertDateToTimeStamp } from '@utils/common/common';

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
  state: string | null;
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

/* TODO: API로 받아온 price, chat, like 데이터는 convert를 통해서 숫자 혹은 null로 전달하기 */

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
}: ListItemProps) => {
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  const listClickHandler = ({ target }: MouseEvent<HTMLLIElement>): void => {
    if (moreBtnRef.current?.contains(target as Node)) return;
    console.log('listItem 클릭');
  };

  const moreBtnClickHandler = ({ target }) => {
    console.log('더보기 버튼 클릭');
  };

  return (
    <S.ListItem onClick={listClickHandler}>
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
            {state && <S.StateBadge>{state}</S.StateBadge>}
            {price ? `${price}원` : '가격 없음'}
          </S.States>
        </S.Info>
        <S.ChatAndLike>
          {chat && (
            <S.ChatAndLikeInfo>
              <Icon
                name={chatIcon.name}
                size={chatIcon.size}
                color={chatIcon.color}
              />
              <span>{chat}</span>
            </S.ChatAndLikeInfo>
          )}
          {like && (
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
    </S.ListItem>
  );
};
