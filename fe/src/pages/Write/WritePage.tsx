import {
  TextInput,
  ImgPreview,
  Button,
  TextArea,
  BottomSheet,
  Dialog,
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
  const [state, fetch] = useFetch<any, null>(getCategoryAPI, [], true);
  const { data } = state;

  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>('');

  const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
    []
  );
  const [categoryIdx, setCategoryIdx] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [contents, setContents] = useState<string>('');
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const getRandomCategories = (categories: Category[]) => {
    if (categories) return getRandomElements(categories, 3);
    else return [];
  };

  const handleCategoryBtnClick = ({ target }) => {
    const btn = target as HTMLButtonElement;
    const idx = displayedCategories.find(
      (category) => category.name === btn.innerText
    )?.idx;
    idx && setCategoryIdx(idx);
  };

  const handleCategoryListClick = ({ target }) => {
    const li = target as HTMLLIElement;
    const categoryName = li.innerText;
    const selectedCategory = data.find(
      (category: Category) => category.name === categoryName
    );
    const selectedIdx = selectedCategory?.idx;
    if (selectedIdx) {
      setCategoryIdx(selectedIdx);
      const isNotContainedToDisplayed = displayedCategories.every(
        (category) => category.idx !== selectedIdx
      );
      if (!isNotContainedToDisplayed) return setCategoryDialogOpen(false);
      const newDisplayedCategories = [
        selectedCategory,
        ...displayedCategories.slice(1, 3),
      ];
      setDisplayedCategories(newDisplayedCategories);
    }
    setCategoryDialogOpen(false);
  };

  useEffect(() => {
    const randomCategories = getRandomCategories(data);
    data && setDisplayedCategories(randomCategories);
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
          hasBorder={false}
        ></TextInput>
        <S.CategorySection>
          <S.CategoryContainer>
            {displayedCategories.map((category) => (
              <Button
                key={category.idx}
                state={categoryIdx === category.idx ? 'active' : 'default'}
                title={category.name}
                hasBorder={true}
                shape="small"
                onClick={handleCategoryBtnClick}
              ></Button>
            ))}
          </S.CategoryContainer>
          <Button
            shape="small"
            icon="arrowRight"
            onClick={() => setCategoryDialogOpen(true)}
          ></Button>
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
          hasBorder={false}
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
      <BottomSheet
        isOpen={isCategoryDialogOpen}
        handleBackdropClick={() => setCategoryDialogOpen(false)}
        leftBtn={{
          text: '닫기',
          icon: 'arrowLeft',
          onClick: () => setCategoryDialogOpen(false),
        }}
      >
        {state.data?.map((category: Category) => (
          <S.CategoryList key={category.idx} onClick={handleCategoryListClick}>
            <S.CategoryListInner>{category.name}</S.CategoryListInner>
          </S.CategoryList>
        ))}
      </BottomSheet>
    </S.WritePage>
  );
};
