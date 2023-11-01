import {
  TextInput,
  ImgPreview,
  Button,
  TextArea,
  BottomSheet,
  Dialog,
  Layout,
  NavbarBtn,
  LocationSelector,
} from '@components/commons';
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import * as S from './WritePageStyle';
import { useEffect, useState, useContext, MouseEvent } from 'react';
import { convertNumToPrice, convertPriceToNum } from '@utils/common/common';
import { Category } from '@type-store/services/category';
import { Image, PostItemRes } from '@type-store/services/items';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';
import { getRandomCategories } from '@services/items/items';
import {
  getDialogMessage,
  useDetails,
  checkAllFilled,
  uploadPostItems,
  uploadEditItems,
} from '@services/items/write';
import { UserInfoContext } from '@stores/UserContext';
import { LocationData } from '@type-store/services/location';
import { LOCATION_FALLBACK } from '@constants/login';
import { getAllLocationData } from '@services/locations/locations';

export const WritePage = ({ type }: { type: 'write' | 'edit' }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { itemIdx } = useParams();

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
  const userInfo = useContext(UserInfoContext);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    userInfo?.isLoggedIn ? userInfo?.main : LOCATION_FALLBACK
  );
  const [locationData, setLocationData] = useState<LocationData[] | null>(null);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);

  if (!userInfo?.isLoggedIn) return <Navigate to="/profile"></Navigate>;

  useEffect(() => {
    checkAllFilled([title, description, images, categoryIdx])
      ? setAllFilled(true)
      : setAllFilled(false);
  }, [title, description, images, price, categoryIdx]);

  const [uploadState, uploadFetch] = useFetch<PostItemRes, []>(
    uploadPostItems.bind(null, {
      title,
      description,
      images,
      price,
      categoryIdx,
      locationIdx: selectedLocation?.locationIdx,
    }),
    []
  );

  const handlePostBtnClick = async () => {
    await uploadFetch();
    if (uploadState.error) return setDialogOpen(true);
    const itemIdx = uploadState.data?.itemIdx;
    if (!itemIdx) return setDialogOpen(true);
    setDialogOpen(true);
  };

  const { details } = useDetails(type);

  useEffect(() => {
    const loadPrevDetails = () => {
      if (type === 'write' || !details) return;
      const { title, description, images, price, categoryIdx } = details;
      setTitle(title);
      setDescription(description);
      setPrice(price);
      setImages(images);
      setCategoryIdx(categoryIdx);
      const category = categoryState.data?.find(
        (category) => categoryIdx === category.idx
      );
      if (!category) return;
      setDisplayedCategories([category]);
    };

    loadPrevDetails();
  }, [details]);

  const [editState, editFetch] = useFetch<null, []>(
    uploadEditItems.bind(null, Number(itemIdx), {
      title,
      description,
      images,
      price,
      categoryIdx,
      locationIdx: selectedLocation?.locationIdx,
    }),
    []
  );

  const handleEditBtnClick = async () => {
    await editFetch();
    if (editState.error) {
      return setDialogOpen(true);
    }
    setDialogOpen(true);
  };

  const handleConfirmDialogBtnClick = () => {
    type === 'write'
      ? !uploadState.data && uploadState.error
        ? setDialogOpen(false)
        : navigate(`/item/${uploadState.data?.itemIdx}`, {
            state: pathname,
          })
      : editState.error
      ? setDialogOpen(false)
      : navigate(`/item/${itemIdx}`, {
          state: pathname,
        });
  };

  const handleCategoryBtnClick = ({ target }) => {
    const btn = target as HTMLButtonElement;
    const idx = displayedCategories.find(
      (category) => category.text === btn.innerText
    )?.idx;
    idx && setCategoryIdx(idx);
  };

  const handleCategoryListClick = (e: MouseEvent<HTMLLIElement>) => {
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
    const getDisplayedCategories = () => {
      const randomCategories =
        categoryState.data && getRandomCategories(categoryState.data);
      randomCategories &&
        categoryState.data &&
        setDisplayedCategories(randomCategories);
    };
    getDisplayedCategories();
  }, [categoryState]);

  useEffect(() => {
    const fetchAllLocationData = async () => {
      const locationData = await getAllLocationData();
      setLocationData(locationData);
    };

    fetchAllLocationData();
  }, []);

  const setSelectedLocationHandler = (locationData) => {
    if (selectedLocation?.locationIdx === locationData.locationIdx) {
      return;
    }

    setSelectedLocation({
      locationIdx: locationData.locationIdx,
      town: locationData.town,
    });
    setIsLocationSelectorOpen(false);
  };

  const locationSelectorHandler = () => {
    setIsLocationSelectorOpen((prev) => !prev);
  };

  return (
    <Layout
      headerOption={{
        type: 'nav',
        navbarOptions: {
          title: '내 물건 팔기',
          leftBtn: <NavbarBtn text="닫기" path="back" />,
          /* path 수정하기 기존 유입 경로 넣기 */
          rightBtn: (
            <Button
              title="완료"
              shape="medium"
              color="neutralText"
              onClick={
                type === 'write' ? handlePostBtnClick : handleEditBtnClick
              }
              state={isAllFilled ? 'default' : 'disabled'}
              backgroundColor="transparent"
            ></Button>
          ),
        },
      }}
      footerOption={{
        type: 'tool',
        toolBarOptions: {
          title: selectedLocation?.town,
          onClick: locationSelectorHandler,
        },
      }}
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
            placeholder={`${selectedLocation?.town}에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)`} //TODO: 내 동네로 수정
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
        {isLocationSelectorOpen && (
          <LocationSelector
            userInfo={userInfo}
            locationData={locationData}
            isLocationSelectorOpen={isLocationSelectorOpen}
            selectedLocation={selectedLocation}
            setSelectedLocationHandler={setSelectedLocationHandler}
            locationSelectorHandler={locationSelectorHandler}
          />
        )}
        <Dialog
          isOpen={isDialogOpen}
          btnInfos={{
            right: {
              text: '확인',
              onClick: handleConfirmDialogBtnClick,
            },
          }}
          handleBackDropClick={() => setDialogOpen(false)}
        >
          {getDialogMessage(type, { uploadState, editState })}
        </Dialog>
      </S.WritePage>
    </Layout>
  );
};
