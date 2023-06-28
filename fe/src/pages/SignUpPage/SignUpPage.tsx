import { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasSelectedLocation, userInfoReducer } from '@services/signUp/signUp';
import {
  Button,
  TextInput,
  Profile,
  Layout,
  NavbarBtn,
  BottomSheet,
  Dialog,
} from '@components/commons';
import * as S from './SignUpPageStyle';
import { getLocationData } from '@services/locations/locations';
import { LocationDataType } from '@type-store/services/signUp';
import { API_URL } from '@constants/apis';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [idFocus, setIdFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [locationDataState, setLocationDataState] = useState<
    LocationDataType[] | null
  >();

  const [formIsValid, setFormIsValid] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const initialUserInfoState = {
    id: { value: '', isValid: null, isTouched: false },
    password: { value: '', isValid: null, isTouched: false },
    mainLocation: {
      locationIdx: null,
      town: null,
    },
    subLocation: {
      locationIdx: null,
      town: null,
    },
    imgUrl: '',
    imgFile: null,
  };
  const [userInfo, dispatch] = useReducer(
    userInfoReducer,
    initialUserInfoState
  );

  const idChangeHandler = ({ target: { value } }) => {
    setIdFocus(true);
    dispatch({ type: 'USER_ID_INPUT', val: value });
  };

  const validateId = () => {
    setIdFocus(false);
    dispatch({ type: `INPUT_ID_BLUR`, val: userInfo.id.value });
  };

  const passwordChangeHandler = ({ target: { value } }) => {
    setPasswordFocus(true);
    dispatch({ type: 'USER_PASSWORD_INPUT', val: value });
  };

  const validatePassword = () => {
    setPasswordFocus(false);
    dispatch({ type: `INPUT_PASSWORD_BLUR`, val: userInfo.password.value });
  };

  const setLocationInfoHandler = (locationIdx, locationName, town) => {
    dispatch({
      type: 'SET_LOCATION',
      val: {
        locationIdx,
        locationName,
        town,
      },
    });
    locationSelectorHandler();
  };

  const removeLocationInfoHandler = (town) => {
    dispatch({
      type: 'REMOVE_LOCATION',
      val: town,
    });
    setIsLocationSelectorOpen(false);
  };

  const findLocationData = (locationName: string) => {
    const locationData = locationDataState?.find(
      (location) => location.locationName === locationName
    );
    return locationData;
  };

  const isSelectedLocation = (locationName) => {
    const mainLocationName = userInfo.mainLocation.locationName;
    const subLocationName = userInfo.subLocation.locationName;

    return (
      mainLocationName === locationName || subLocationName === locationName
    );
  };

  const locationClickHandler = (locationName) => {
    const locationData = findLocationData(locationName);
    const locationIdx = locationData?.locationIdx;
    const locationTown = locationData?.town;

    isSelectedLocation(locationName)
      ? removeLocationInfoHandler(locationTown)
      : setLocationInfoHandler(locationIdx, locationName, locationTown);
  };

  const locationSelectorHandler = () => {
    setIsLocationSelectorOpen((prev) => !prev);
  };

  const signUpUser = async (signUpData) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      body: signUpData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  };

  const signUpUserHandler = async () => {
    const { id, password, mainLocation, subLocation, imgFile } = userInfo;

    const formData = new FormData();
    formData.append('loginId', id.value);
    formData.append('password', password.value);
    formData.append('image', imgFile);
    formData.append('mainLocationIdx', mainLocation.locationIdx.toString());
    formData.append(
      'subLocationIdx',
      subLocation.locationIdx ? subLocation.locationIdx.toString() : null
    );
    try {
      await signUpUser(formData);
      navigate('/profile');
    } catch (error) {
      setErrorMessage((error as Error).message);
      setDialogOpen(true);
      console.log(error); // TODO: 삭제
    }
  };

  const signUpBtnClickHandler = () => {
    signUpUserHandler();
  };

  const {
    id: { value: enteredId, isValid: idIsValid, isTouched: idTouched },
  } = userInfo;

  const {
    password: {
      value: enteredPassword,
      isValid: passwordIsValid,
      isTouched: passwordTouched,
    },
  } = userInfo;

  const locationState = hasSelectedLocation(userInfo);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        !!idIsValid &&
          !!passwordIsValid &&
          userInfo.mainLocation.locationIdx !== null
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [idIsValid, passwordIsValid, userInfo.mainLocation.locationIdx]);

  useEffect(() => {
    const fetchLocationData = async () => {
      const locationData = await getLocationData();
      setLocationDataState(locationData);
    };

    fetchLocationData();
  }, []);

  return (
    <>
      <Layout
        headerOption={{
          type: 'nav',
          navbarOptions: {
            title: '회원가입',
            leftBtn: <NavbarBtn text="닫기" icon="arrowLeft" path="/profile" />,
            rightBtn: (
              <Button
                title="완료"
                shape="medium"
                state={formIsValid ? 'active' : 'disabled'}
                color="neutralText"
                backgroundColor="neutralBackground"
                onClick={signUpBtnClickHandler}
              />
            ),
          },
        }}
      >
        <S.SignUpPage>
          <S.ProfileImgInput>
            <Profile
              size={90}
              isEditable={true}
              imgUrl={userInfo.imgUrl}
              setImgUrl={(newUrl: string, newFile: File) =>
                dispatch({
                  type: 'USER_IMG_INPUT',
                  val: { imgUrl: newUrl, imgFile: newFile },
                })
              }
            />
          </S.ProfileImgInput>
          <S.InputSection>
            <TextInput
              shape="large"
              value={enteredId}
              placeholder="아이디를 입력하세요"
              label="아이디"
              onChange={idChangeHandler}
              onBlur={validateId}
            />
            {((!idIsValid && idFocus) || (!idIsValid && idTouched)) && (
              <S.AlertText>
                아이디는 3~12자의 영문, 숫자만 사용 가능합니다
              </S.AlertText>
            )}
            <TextInput
              type="password"
              shape="large"
              value={enteredPassword}
              placeholder="비밀번호를 입력하세요"
              label="비밀번호"
              onChange={passwordChangeHandler}
              onBlur={validatePassword}
            />
            {((!passwordIsValid && passwordFocus) ||
              (!passwordIsValid && passwordTouched)) && (
              <S.AlertText>
                비밀번호는 6~12자의 영문, 숫자만 사용 가능합니다
              </S.AlertText>
            )}
          </S.InputSection>
          <S.LocationButtonSection>
            {!locationState && (
              <Button
                title="위치 추가"
                state="default"
                shape="large"
                icon="plus"
                hasBorder={true}
                onClick={locationSelectorHandler}
              />
            )}
            {locationState && (
              <>
                <Button
                  title={userInfo.mainLocation.town}
                  shape="large"
                  state="active"
                  textAlign="left"
                  color="systemBackground"
                  icon="close"
                  hasBorder={true}
                  onClick={() =>
                    removeLocationInfoHandler(userInfo.mainLocation.town)
                  }
                />
                <Button
                  title={
                    userInfo.subLocation.town
                      ? userInfo.subLocation.town
                      : '위치 추가'
                  }
                  shape="large"
                  state={
                    userInfo.subLocation.locationIdx ? 'active' : 'default'
                  }
                  color={
                    userInfo.subLocation.locationIdx
                      ? 'systemBackground'
                      : 'neutralTextStrong'
                  }
                  textAlign={
                    userInfo.subLocation.locationIdx ? 'left' : 'center'
                  }
                  icon={userInfo.subLocation.locationIdx ? 'close' : 'plus'}
                  onClick={
                    userInfo.subLocation.locationIdx
                      ? () =>
                          removeLocationInfoHandler(userInfo.subLocation.town)
                      : locationSelectorHandler
                  }
                  hasBorder={true}
                />
              </>
            )}
          </S.LocationButtonSection>
        </S.SignUpPage>
      </Layout>
      <BottomSheet
        isOpen={isLocationSelectorOpen}
        handleBackdropClick={() => setIsLocationSelectorOpen(false)}
        leftBtn={{
          text: '닫기',
          onClick: () => setIsLocationSelectorOpen(false),
        }}
      >
        {locationDataState?.map((locationData) => (
          <S.LocationList
            key={locationData.locationIdx}
            onClick={() => locationClickHandler(locationData.locationName)}
          >
            <S.LocationListInner
              color={
                isSelectedLocation(locationData.locationName)
                  ? 'accentBackgroundPrimary'
                  : 'neutralText'
              }
            >
              {locationData.locationName}
            </S.LocationListInner>
          </S.LocationList>
        ))}
      </BottomSheet>
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
        {errorMessage}
      </Dialog>
    </>
  );
};
