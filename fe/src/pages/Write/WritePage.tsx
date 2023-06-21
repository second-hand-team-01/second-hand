import { TextInput, ImgPreview, Button, TextArea } from '@components/commons';
import { useNavigate } from 'react-router-dom';
import * as S from './WritePageStyle';
import { useState } from 'react';
import {
  convertNumToPrice,
  convertPriceToNum,
  Type,
  getType,
} from '@utils/common/common';

interface WritePageProps {
  status: 'write' | 'edit';
}

export const WritePage = ({ status }: WritePageProps) => {
  const [files, setFiles] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [contents, setContents] = useState<string>('');

  return (
    <S.WritePage>
      <ImgPreview fileState={[files, setFiles]}></ImgPreview>
      <S.TitleSection>
        <TextInput
          placeholder="글제목"
          value={title}
          shape="large"
          onChange={({ target }) => setTitle(target.value)}
          hasPadding={false}
        ></TextInput>
        <S.CategorySection>
          <S.CategoryContainer>
            <Button shape="small" title="타이틀" hasBorder={true}></Button>
            <Button shape="small" title="타이틀" state="active"></Button>
          </S.CategoryContainer>
          <Button shape="small" icon="arrowRight"></Button>
        </S.CategorySection>
      </S.TitleSection>
      <S.PriceSection>
        ₩
        <TextInput
          value={price !== 0 ? convertNumToPrice(price) : ''}
          shape="large"
          placeholder="가격(선택사항)"
          onChange={({ target }) => {
            const number = convertPriceToNum(target.value);
            if (!Number.isNaN(number)) {
              setPrice(convertPriceToNum(target.value));
            }
          }}
          hasPadding={false}
        ></TextInput>
      </S.PriceSection>
      <TextArea
        value={contents}
        shape="large"
        placeholder="역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)" //TODO: 내 동네로 수정
        onChange={({ target }) => setContents(target.value)}
        hasPadding={false}
        rows={30}
      ></TextArea>
    </S.WritePage>
  );
};
