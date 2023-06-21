import {
  TextInput,
  ImgPreview,
  Button,
  TextArea,
  BottomSheet,
} from '@components/commons';
import { useNavigate } from 'react-router-dom';
import * as S from './WritePageStyle';
import { useEffect, useState } from 'react';
import {
  convertNumToPrice,
  convertPriceToNum,
  Type,
  getType,
  getRandomElements,
} from '@utils/common/common';
import { Category } from '@type-store/services/category';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';
import { Image } from '@type-store/services/images';

interface WritePageProps {
  status: 'write' | 'edit';
}

export const WritePage = ({ status }: WritePageProps) => {
  const [state, refetch] = useFetch<any, null>(getCategoryAPI, [], true);
  const { data } = state;

  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number | null>(
    null
  );
  const [price, setPrice] = useState<number>(0);
  const [contents, setContents] = useState<string>('');
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(true);

  const getRandomCategories = (categories: Category[]) => {
    if (categories) return getRandomElements(categories, 3);
    else return [];
  };

  useEffect(() => {
    const randomCategories = getRandomCategories(data);
    data && setCategories(randomCategories);
  }, [data]);

  return (
    <S.WritePage>
      <ImgPreview imageState={[images, setImages]}></ImgPreview>
      <S.TitleSection>
        <TextInput
          placeholder="글제목"
          value={title}
          shape="large"
          onChange={({ target }) => setTitle(target.value)}
          hasPadding={false}
          maxLength={40}
        ></TextInput>
        <S.CategorySection>
          <S.CategoryContainer>
            {categories.map((category) => (
              <Button
                key={category.idx}
                state={
                  selectedCategoryIdx === category.idx ? 'active' : 'default'
                }
                title={category.name}
                hasBorder={true}
                shape="small"
                onClick={({ target }) => {
                  const btn = target as HTMLButtonElement;
                  const idx = categories.find(
                    (category) => category.name === btn.innerText
                  )?.idx;
                  idx && setSelectedCategoryIdx(idx);
                }}
              ></Button>
            ))}
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
          maxLength={15}
        ></TextInput>
      </S.PriceSection>
      <TextArea
        value={contents}
        shape="large"
        placeholder="역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)" //TODO: 내 동네로 수정
        onChange={({ target }) => setContents(target.value)}
        hasPadding={false}
        maxLength={1000}
      ></TextArea>
      <BottomSheet isOpen={isCategoryDialogOpen}>바텀시트</BottomSheet>
    </S.WritePage>
  );
};
