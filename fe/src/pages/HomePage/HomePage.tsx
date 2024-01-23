import {
  Layout,
  Button,
  LocationSelector,
  LocationPopup,
  Dialog,
} from '@commons/index';
import * as S from './HomePageStyle';
import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryPopup } from './CategoryPopup/CategoryPopup';
import { UserInfoContext, UserInfoDispatchContext } from '@stores/UserContext';
import { LOCATION_FALLBACK } from '@constants/login';
import {
  getAllLocationDataAPI,
  putUserLocation,
} from '@services/locations/locations';
import { LocationData } from '@type-store/services/location';
import { HomeList } from './HomeList/HomeList';
import { Category } from '@type-store/services/category';
import { useFetch } from '@hooks/useFetch/useFetch';

export const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const userInfo = useContext(UserInfoContext);
  const userInfoDispatch = useContext(UserInfoDispatchContext);

  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [isLocationPopupOpen, setLocationPopupOpen] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);

  const [{ data: locationData }] = useFetch<LocationData[], null>(
    getAllLocationDataAPI,
    [],
    true
  );

  const addUserLocationHandler = async (newLocation, userMainLocation) => {
    if (newLocation.locationIdx === userMainLocation.locationIdx) {
      setIsLocationSelectorOpen(false);
      setLocationPopupOpen(true);
      return;
    }

    try {
      const putUserLocationRes = await putUserLocation(
        userMainLocation.locationIdx,
        newLocation.locationIdx
      );

      userInfoDispatch &&
        userInfoDispatch({
          type: 'SET_LOCATION',
          payload: {
            main: {
              locationIdx: putUserLocationRes.main.locationIdx,
              town: putUserLocationRes.main.town,
            },
            sub: {
              locationIdx: putUserLocationRes.sub.locationIdx,
              town: putUserLocationRes.sub.town,
            },
          },
        });
      userInfoDispatch &&
        userInfoDispatch({
          type: 'SET_USER_SELECTED_LOCATION',
          payload: {
            locationIdx: putUserLocationRes.sub.locationIdx,
            town: putUserLocationRes.sub.town,
          },
        });

      setIsLocationSelectorOpen(false);
      setLocationPopupOpen(true);
    } catch (error) {
      return error;
    }
  };

  const removeUserLocationHandler = async (
    selectedLocationIdx,
    userMainLocationIdx,
    userSubLocationIdx,
    event
  ) => {
    event.stopPropagation();
    if (
      userMainLocationIdx === selectedLocationIdx &&
      userSubLocationIdx === null
    ) {
      setDialogOpen(true);
      return;
    }

    const newUserLocationIdx =
      selectedLocationIdx === userMainLocationIdx
        ? userSubLocationIdx
        : userMainLocationIdx;

    try {
      const putUserLocationRes = await putUserLocation(
        newUserLocationIdx,
        null
      );

      userInfoDispatch &&
        userInfoDispatch({
          type: 'SET_LOCATION',
          payload: {
            main: {
              locationIdx: putUserLocationRes.main.locationIdx,
              town: putUserLocationRes.main.town,
            },
            sub: { locationIdx: null, town: null },
          },
        });
      userInfoDispatch &&
        userInfoDispatch({
          type: 'SET_USER_SELECTED_LOCATION',
          payload: {
            locationIdx: putUserLocationRes.main.locationIdx,
            town: putUserLocationRes.main.town,
          },
        });
    } catch (error) {
      return (error as Error).message;
    }
  };

  const locationPopupClickHandler = (locationIdx, town) => {
    if (userInfo?.selectedLocation?.locationIdx === locationIdx) {
      setLocationPopupOpen(false);
      return;
    }

    userInfoDispatch &&
      userInfoDispatch({
        type: 'SET_USER_SELECTED_LOCATION',
        payload: { locationIdx: locationIdx, town: town },
      });
    setLocationPopupOpen(false);
  };

  const locationDropdownClickHandler = (locationIdx, town) => {
    if (userInfo?.selectedLocation?.locationIdx === locationIdx) {
      setLocationDropdownOpen(false);
      return;
    }

    userInfoDispatch &&
      userInfoDispatch({
        type: 'SET_USER_SELECTED_LOCATION',
        payload: { locationIdx: locationIdx, town: town },
      });
    setLocationDropdownOpen(false);
  };

  const locationPopupHandler = () => {
    if (!userInfo?.isLoggedIn) {
      navigate('/profile');
    }
    if (isLocationDropdownOpen) {
      setLocationDropdownOpen(false);
    }
    setLocationPopupOpen((prev) => !prev);
  };

  const locationSelectorHandler = () => {
    if (!isLocationPopupOpen && isLocationSelectorOpen) {
      setIsLocationSelectorOpen(false);
      setLocationPopupOpen(true);
    } else {
      setLocationPopupOpen(false);
      setIsLocationSelectorOpen(true);
    }
  };

  const handleDeleteBtn = () => {
    setSelectedCategory(undefined);
  };

  return (
    <>
      <Layout
        headerOption={{
          type: 'filter',
          filterBarOptions: {
            locationDropdownClickHandler,
            locationPopupHandler,
            openState: [isLocationDropdownOpen, setLocationDropdownOpen],
            mainLocation: userInfo?.isLoggedIn
              ? userInfo?.main
              : LOCATION_FALLBACK,
            subLocation:
              userInfo?.isLoggedIn && userInfo?.sub ? userInfo?.sub : null,
            region: userInfo?.isLoggedIn
              ? userInfo?.selectedLocation?.town
              : LOCATION_FALLBACK.town,
            handleFilterBtnClick: () => {
              setCategoryPopupOpen(true);
            },
            handleDeleteBtn,
            selectedCategory,
          },
        }}
        footerOption={{ type: 'tab' }}
      >
        <S.Home>
          <HomeList
            selectedCategory={selectedCategory}
            selectedLocation={userInfo?.selectedLocation?.town}
            selectedLocationIdx={userInfo?.selectedLocation?.locationIdx}
          />
          <S.FloatingBtn>
            <Button
              shape={'floating'}
              icon="plus"
              color={'accentText'}
              backgroundColor="accentBackgroundPrimary"
              onClick={() =>
                navigate('/write', { state: { prevPathname: pathname } })
              }
            ></Button>
          </S.FloatingBtn>
        </S.Home>
      </Layout>

      <CategoryPopup
        categoryPopupOpenState={[isCategoryPopupOpen, setCategoryPopupOpen]}
        setSelectedCategory={setSelectedCategory}
      />
      {isLocationPopupOpen && (
        <LocationPopup
          userInfo={userInfo}
          selectedLocation={userInfo?.selectedLocation}
          isLocationPopupOpen={isLocationPopupOpen}
          locationPopupClickHandler={locationPopupClickHandler}
          locationPopupHandler={locationPopupHandler}
          removeUserLocationHandler={removeUserLocationHandler}
          locationSelectorHandler={locationSelectorHandler}
        />
      )}
      {isLocationSelectorOpen && (
        <LocationSelector
          userInfo={userInfo}
          locationData={locationData}
          isLocationSelectorOpen={isLocationSelectorOpen}
          addUserLocationHandler={addUserLocationHandler}
          locationSelectorHandler={locationSelectorHandler}
        />
      )}
      <Dialog
        isOpen={isDialogOpen}
        btnInfos={{
          right: {
            text: '확인',
            onClick: () => setDialogOpen(false),
          },
        }}
        handleBackDropClick={() => setDialogOpen(false)}
      >
        동네는 최소 1개 이상 선택해야해요
      </Dialog>
    </>
  );
};
