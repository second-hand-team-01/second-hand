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
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import * as S from './WritePageStyle';
import { useEffect, useState, useCallback } from 'react';
import {
  convertNumToPrice,
  convertPriceToNum,
  getType,
  Type,
} from '@utils/common/common';
import { Category, CategoryRes } from '@type-store/services/category';
import { ItemDetail } from '@type-store/services/items';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';
import { getItemDetailAPI } from '@services/items/items';
import { Image, PostItemRes } from '@type-store/services/items';
import {
  postItemsAPI,
  convertDataToBody,
  getRandomCategories,
} from '@services/items/items';
import { ERROR_MESSAGE } from '@constants/error';
import { Response } from '@hooks/useFetch/useFetch';

export const WritePage = ({ type }: { type: 'write' | 'edit' }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [title, setTitle] = useState<string>('');
  const [categoryState] = useFetch(getCategoryAPI, [], true);
  const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
    []
  );
  const [categoryIdx, setCategoryIdx] = useState<number | null>(-1);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [isAllFilled, setAllFilled] = useState(false);
  const locationIdx = -1; // TODO

  const { data } = useDetails(type);

  useEffect(() => {
    if (!data) return;
    const { title, description, images, price, category } = data;
    setTitle(title);
    setDescription(description);
    setPrice(price);
  }, [data]);

  useEffect(() => {
    checkAllFilled([title, description, images, categoryIdx])
      ? setAllFilled(true)
      : setAllFilled(false);
  }, [title, description, images, price, categoryIdx]);

  const uploadPostItems = useCallback(async () => {
    const body = convertDataToBody(
      title,
      description,
      images,
      price,
      categoryIdx as number,
      locationIdx
    );
    const result = await postItemsAPI(body);
    return result as Response<PostItemRes>;
  }, [title, description, images, price, categoryIdx]);

  const [uploadState, uploadFetch] = useFetch<PostItemRes, []>(
    uploadPostItems,
    []
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCategoryBtnClick = ({ target }) => {
    const btn = target as HTMLButtonElement;
    const idx = displayedCategories.find(
      (category) => category.text === btn.innerText
    )?.idx;
    idx && setCategoryIdx(idx);
  };

  const handleCategoryListClick = (e) => {
    e.preventDefault();
    const li = e.target as HTMLLIElement;
    const categoryName = li.innerText;
    const selectedCategory = categoryState.data?.find(
      (category: Category) => category.text === categoryName
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
    const randomCategories =
      categoryState.data && getRandomCategories(categoryState.data);
    randomCategories &&
      categoryState.data &&
      setDisplayedCategories(randomCategories);
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
          title: '내 물건 팔기',
          leftBtn: <NavbarBtn text="닫기" path="back"></NavbarBtn>,
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
            shape="small"
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
                  title={category.text}
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
            shape="small"
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
        <S.Contents>
          <TextArea
            value={description}
            shape="small"
            placeholder="역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)" //TODO: 내 동네로 수정
            onChange={({ target }) => setDescription(target.value)}
            hasPadding={false}
            maxLength={1000}
            rows={20}
          ></TextArea>
        </S.Contents>
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
              <S.CategoryListInner>{category.text}</S.CategoryListInner>
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
                  : navigate(`/item/${uploadState.data?.itemIdx}`, {
                      state: pathname,
                    });
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

const useDetails = (type: 'write' | 'edit') => {
  if (type === 'write') return { data: null };
  const { itemIdx } = useParams();
  const [state] = useFetch(
    getItemDetailAPI.bind(null, Number(itemIdx)),
    [],
    true
  );

  return { data: state.data };
};

const checkAllFilled = (values: unknown[]) => {
  return values.every((value) => {
    const type = getType(value);
    if (type === Type.String) {
      return Boolean(value) === false ? false : true;
    }
    if (type === Type.Number) {
      return value === -1 ? false : true;
    }
    if (type === Type.LiteralObject) {
      return Object.keys(value as object) ? false : true;
    }
    if (type === Type.Array) {
      const arr = value as unknown[];
      return arr.length === 0 ? false : true;
    }
    return false;
  }, false);
};
