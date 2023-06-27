import { useState, useReducer, useEffect } from 'react';

import {
  hasLocationData,
  checkIdValidity,
  checkPasswordValidity,
  userInfoReducer,
} from '@services/signUp/signUp';
import {
  Button,
  TextInput,
  Profile,
  Layout,
  NavbarBtn,
  LocationSelector,
} from '@components/commons';
import * as S from './SignUpPageStyle';
import { getLocationData } from '@services/locations/locations';

export const SignUpPage = () => {
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [isLocationSelectorRendered, setIsLocationSelectorRendered] =
    useState(false);
  const [locationData, setLocationData] = useState(null);

  const [formIsValid, setFormIsValid] = useState(false);
  const initialUserInfoState = {
    id: { value: '', isValid: null, isTouched: false },
    password: { value: '', isValid: null, isTouched: false },
    mainLocation: {
      locationIdx: 1,
      locationName: '강남',
    },
    subLocation: {
      locationIdx: null,
      locationName: null,
    },
    imgUrl: '',
  };

  const [userInfo, dispatch] = useReducer(
    userInfoReducer,
    initialUserInfoState
  );
  const [idFocus, setIdFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

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

  // TODO: val 타입 오류 해결하기(임시방편 ""로 해결)
  const subLocationDeleteHandler = () => {
    dispatch({
      type: 'SUB_LOCATION_REMOVE',
      val: '',
    });
  };

  const mainLocationDeleteHandler = () => {
    dispatch({
      type: 'MAIN_LOCATION_REMOVE',
      val: '',
    });
  };

  const locationSelectorHandler = () => {
    setIsLocationSelectorOpen(true);
  };

  const postBtnClickHandler = () => {
    console.log(2);
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

  const locationState = hasLocationData(userInfo);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(!!idIsValid && !!passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [idIsValid, passwordIsValid]);

  useEffect(() => {
    setIsLocationSelectorRendered(true);
    const fetchLocationData = async () => {
      setIsLocationSelectorRendered(true);
      const locationData = await getLocationData();
      setLocationData(locationData);
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
                onClick={postBtnClickHandler}
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
              setImgUrl={(newUrl) =>
                dispatch({ type: 'USER_IMG_INPUT', val: newUrl })
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
                  title={userInfo.mainLocation.locationName}
                  shape="large"
                  state="active"
                  textAlign="left"
                  color="systemBackground"
                  icon="close"
                  hasBorder={true}
                  onClick={mainLocationDeleteHandler}
                />
                <Button
                  title={
                    userInfo.subLocation.locationName
                      ? userInfo.subLocation.locationName
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
                      ? subLocationDeleteHandler
                      : locationSelectorHandler
                  }
                  hasBorder={true}
                />
              </>
            )}
          </S.LocationButtonSection>
        </S.SignUpPage>
      </Layout>
      {isLocationSelectorRendered && locationData && (
        <LocationSelector
          locationData={locationData}
          locationState={userInfo}
          locationSelectorOpenState={[
            isLocationSelectorOpen,
            setIsLocationSelectorOpen,
          ]}
          // dispatch를 내려줘야되는데..... 조건분기 어케 처리하누
          //
        />
      )}
    </>
  );
};

// alert text
// 로그인 화면에서는 아이디만 (비밀번호는 x)
// 가입화면에서는 아이디, 비밀번호 둘다

// locationSelector에 dispatch 내려야함

// locationSelector에 data 상태가 있고
// locationSelector가 렌더링 되고, fetch 하고 나서 data 상태를 변경해서 다시 렌더
// idx 매핑해서 클릭 함수 prop 전달하고
