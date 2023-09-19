import {
  Layout,
  Button,
  LocationSelector,
  LocationPopup,
} from '@commons/index';
import * as S from './HomePageStyle';
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryPopup } from './CategoryPopup/CategoryPopup';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';
import { UserContext } from '@stores/UserContext';
import { LOCATION_FALLBACK } from '@constants/login';
import { getAllLocationData } from '@services/locations/locations';
import { ReactQuerySuspense } from '@components/commons/ReactQuerySuspense/ReactQuerySuspense';
import { HomeList } from './HomeList/HomeList';

export const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const [isCategoryPopupRendered, setCategoryPopupRendered] = useState(false);
  const [categoryState, categoryFetch] = useFetch(getCategoryAPI, []);
  const [categoryIdx, setCategoryIdx] = useState<number | undefined>(undefined);

  const { isLoggedIn, userInfo } = useContext(UserContext);

  const { userMainLocationIdx, userMainTown } = userInfo.main;
  const { userSubTown } = userInfo.sub;

  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [isLocationPopupOpen, setLocationPopupOpen] = useState(false);
  const [locationData, setLocationData] = useState<
    | [
        {
          locationIdx: number | null;
          locationName: string | null;
          city: string | null;
          district: string | null;
          town: string | null;
        }
      ]
    | null
  >(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const locationData = await getAllLocationData();
      setLocationData(locationData);
    };

    fetchLocationData();
  }, []);

  const getLocationDataByTown = (town: string | null) => {
    const foundLocationData = locationData?.find(
      (location) => location.town === town
    );
    return foundLocationData;
  };

  const selectedLocation = {
    main: {
      locationIdx: userInfo.main.locationIdx,
      town: userInfo.main.town,
    },
    sub: {
      locationIdx: userInfo.sub.locationIdx,
      town: userInfo.sub.town,
    },
  };

  const addLocationHandler = (locationIdx, locationTown) => {
    selectedLocation.sub.locationIdx = locationIdx;
    selectedLocation.sub.town = locationTown;
  };

  const removeLocationHandler = (locationTown) => {
    if (
      selectedLocation.main.town === locationTown &&
      selectedLocation.sub.town === null
    )
      return; // TODO : 최소 지역 1개 입력에 대한 dialog 띄우기

    if (
      selectedLocation.main.town === locationTown &&
      selectedLocation.sub.town !== null
    ) {
      selectedLocation.main = selectedLocation.sub;
      selectedLocation.sub.locationIdx = null;
      selectedLocation.sub.town = null;
      return; // fetch 실행
    }

    if (selectedLocation.sub.town === locationTown) {
      selectedLocation.sub.locationIdx = null;
      selectedLocation.sub.town = null;
      // fetch 실행
    }
  };

  const isSelectedLocation = (locationIdx) => {
    const mainLocationIdx = selectedLocation.main.locationIdx;
    const subLocationIdx = selectedLocation.sub.locationIdx;

    return mainLocationIdx === locationIdx || subLocationIdx === locationIdx;
  };

  const locationClickHandler = (town: string | null) => {
    const foundLocationData = getLocationDataByTown(town);
    const foundLocationIdx = foundLocationData?.locationIdx;
    const foundLocationTown = foundLocationData?.town;

    isSelectedLocation(foundLocationIdx)
      ? removeLocationHandler(foundLocationIdx)
      : addLocationHandler(foundLocationIdx, foundLocationTown);
  };
  useEffect(() => {
    setCategoryPopupRendered(true);
  }, []);

  const locationPopupHandler = () => {
    setLocationPopupOpen(true);
  };

  const handleDeleteBtn = () => {
    setCategoryIdx(undefined);
  };

  return (
    <>
      <Layout
        headerOption={{
          type: 'filter',
          filterBarOptions: {
            locationPopupHandler: () => locationPopupHandler(),
            openState: [isLocationDropdownOpen, setLocationDropdownOpen],
            mainLocation: isLoggedIn
              ? userMainTown
              : LOCATION_FALLBACK.locationName,
            subLocation: userSubTown ? userSubTown : null,
            region: isLoggedIn ? userMainTown : LOCATION_FALLBACK.locationName,
            handleFilterBtnClick: () => {
              setCategoryPopupOpen(true);
              !categoryState.data && categoryFetch();
            },
            handleDeleteBtn,
            selectedCategory: categoryState.data?.find(
              (category) => category.idx === categoryIdx
            ),
          },
        }}
        footerOption={{ type: 'tab' }}
      >
        <S.Home>
          <HomeList
            categoryIdx={categoryIdx}
            userMainLocationIdx={userMainLocationIdx}
          />
          <S.FloatingBtn>
            <Button
              shape={'floating'}
              icon="plus"
              color={'accentText'}
              backgroundColor="accentBackgroundPrimary"
              onClick={() => navigate('/write', { state: pathname })}
            ></Button>
          </S.FloatingBtn>
        </S.Home>
      </Layout>
      {isCategoryPopupRendered && (
        <CategoryPopup
          categoryState={categoryState}
          categoryFetch={categoryFetch}
          categoryPopupOpenState={[isCategoryPopupOpen, setCategoryPopupOpen]}
          selectCategoryIdx={(selectedCategoryIdx) =>
            setCategoryIdx(selectedCategoryIdx)
          }
        />
      )}
      {isLocationPopupOpen && (
        <LocationPopup
          userInfo={userInfo}
          isLocationPopupOpen={isLocationPopupOpen}
          setIsLocationPopupOpen={setLocationPopupOpen}
          removeLocationHandler={removeLocationHandler}
          setIsLocationSelectorOpen={setIsLocationSelectorOpen}
        />
      )}
      {isLocationSelectorOpen && (
        <LocationSelector
          userInfo={userInfo}
          locationData={locationData}
          isLocationSelectorOpen={isLocationSelectorOpen}
          setIsLocationSelectorOpen={setIsLocationSelectorOpen}
          locationClickHandler={locationClickHandler}
        />
      )}
    </>
  );
};

// token이 있는지 없는지 확인하고 있으면, useContext에서 location 가져오기
// token이 없으면 하드코딩

// put 보낼 데이터는 상태로 관리하지말고 객체로 만들고
// 데이터 만들어서 보내고 데이터가 정상적으로 오면
// dispatch를 실행하고
// popup에는 userInfo를 내려주면 된다
// popup에는 removehandler 내려주고

// post를 보내고 selecotor를 닫자

// 이미 로그인을 해서 지역정보를 가지고 있음
