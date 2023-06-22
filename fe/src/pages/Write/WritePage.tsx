import {
  TextInput,
  ImgPreview,
  Button,
  TextArea,
  BottomSheet,
  Dialog,
  Layout,
  NavbarBtn,
} from '@components/commons';
import { useNavigate } from 'react-router-dom';
import * as S from './WritePageStyle';
import { useEffect, useState, useCallback } from 'react';
import {
  convertNumToPrice,
  convertPriceToNum,
  getRandomElements,
  getType,
  Type,
  checkAllFilled,
} from '@utils/common/common';
import { Category } from '@type-store/services/category';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';
import { Image } from '@type-store/services/items';
import {
  postItemsAPI,
  convertDataToBody,
  getRandomCategories,
} from '@services/items/items';
import { ERROR_MESSAGE } from '@constants/error';

interface WritePageProps {
  status: 'write' | 'edit';
}

export const WritePage = ({ status }: WritePageProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [categoryState, categoryFetch] = useFetch<any, null>(
    getCategoryAPI,
    [],
    true
  );
  const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
    []
  );
  const [categoryIdx, setCategoryIdx] = useState<number | null>(-1);
  const [price, setPrice] = useState<number>(-1);
  const [contents, setContents] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [isAllFilled, setAllFilled] = useState(false);
  const locationIdx = -1; // TODO

  useEffect(() => {
    checkAllFilled([title, contents, images, price, categoryIdx])
      ? setAllFilled(true)
      : setAllFilled(false);
  }, [title, contents, images, price, categoryIdx]);

  const uploadPostItems = useCallback(async () => {
    const body = convertDataToBody(
      title,
      contents,
      images,
      price,
      categoryIdx as number,
      locationIdx
    );
    const result = await postItemsAPI(body);
    return result as any;
  }, [title, contents, images, price, categoryIdx]);

  const [uploadState, uploadFetch] = useFetch<any, any>(uploadPostItems, []);
  const [isDialogOpen, setDialogOpen] = useState(false);

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
    const selectedCategory = categoryState.data.find(
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
    const randomCategories = getRandomCategories(categoryState.data);
    categoryState.data && setDisplayedCategories(randomCategories);
  }, [categoryState]);

  const handlePostBtnClick = async () => {
    await uploadFetch();
    if (uploadState.error) return setDialogOpen(true);
    const itemIdx = uploadState.data?.itemIdx;
    if (!itemIdx) return setDialogOpen(true);
    setDialogOpen(true);
  };

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: '글 작성',
          leftBtn: <NavbarBtn text="닫기" path="/"></NavbarBtn>,
          rightBtn: (
            <Button
              title="완료"
              shape="medium"
              color="neutralText"
              onClick={handlePostBtnClick}
              state={isAllFilled ? 'default' : 'disabled'}
              backgroundColor="transparent"
            ></Button>
          ),
        },
      }}
      footerOption={{ type: 'tool' }}
    >
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
            value={price !== -1 ? convertNumToPrice(price) : ''}
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
          {categoryState.data?.map((category: Category) => (
            <S.CategoryList
              key={category.idx}
              onClick={handleCategoryListClick}
            >
              <S.CategoryListInner>{category.name}</S.CategoryListInner>
            </S.CategoryList>
          ))}
        </BottomSheet>
        <Dialog
          isOpen={isDialogOpen}
          btnInfos={{
            right: {
              text: '확인',
              onClick: () => {
                !uploadState.data && uploadState.error
                  ? setDialogOpen(false)
                  : navigate(`/item/${uploadState.data.itemIdx}`);
              },
            },
          }}
          handleBackDropClick={() => setDialogOpen(false)}
        >
          {!uploadState.data && uploadState.error
            ? ERROR_MESSAGE.FILE_UPLOAD_ERROR
            : '상품이 등록 되었어요.'}
        </Dialog>
      </S.WritePage>
    </Layout>
  );
};
