import { Icon } from '@commons/index';
import * as S from './ImgElementStyle';

interface ImgElementProps {
  file: string;
  isFirst: boolean;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ImgElement = ({
  file,
  isFirst,
  handleDelete,
}: ImgElementProps) => {
  return (
    <S.ImgWrap>
      <S.Img src={`${file}`} key={`${file}`} width="80px" height="80px"></S.Img>
      {isFirst ? (
        <>
          <S.CloseBtn onClick={handleDelete}>
            <Icon name="close" color="accentText" size={12}></Icon>
          </S.CloseBtn>
          <S.Thumbnail>대표사진</S.Thumbnail>
        </>
      ) : (
        <S.CloseBtn onClick={handleDelete}>
          <Icon name="close" color="accentText" size={12}></Icon>
        </S.CloseBtn>
      )}
    </S.ImgWrap>
  );
};
