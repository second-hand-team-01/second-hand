import { useState, useReducer, useEffect } from 'react';
import {
  Button,
  TextInput,
  Profile,
  Layout,
  NavbarBtn,
} from '@components/commons';
import * as S from './SignUpPageStyle';

const hasLocationData = (userInfo) => {
  const { mainLocation } = userInfo;
  return mainLocation.locationIdx === null ? false : true;
};

const checkIdValidity = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{3,12}$/;

  return regex.test(id);
};

const checkPasswordValidity = (password: string): boolean => {
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  return regex.test(password);
};

interface State {
  id: { value: string; isValid: boolean | null; isTouched?: boolean };
  password: { value: string; isValid: boolean | null; isTouched?: boolean };
  mainLocation: {
    locationIdx: number | null;
    locationName: string | null;
  };
  subLocation: {
    locationIdx: number | null;
    locationName: string | null;
  };
  imgUrl: string | null;
}

interface Action {
  type: string;
  val: string;
}

const userInfoReducer = (state: State, action: Action) => {
  const { type, val } = action;
  switch (type) {
    case 'USER_ID_INPUT':
      return { ...state, id: { value: val, isValid: checkIdValidity(val) } };
    case `INPUT_ID_BLUR`:
      return {
        ...state,
        id: {
          value: state.id.value,
          isValid: checkIdValidity(val),
          isTouched: true,
        },
      };
    case 'USER_PASSWORD_INPUT':
      return {
        ...state,
        password: { value: val, isValid: checkPasswordValidity(val) },
      };
    case `INPUT_PASSWORD_BLUR`:
      return {
        ...state,
        password: {
          value: state.password.value,
          isValid: checkPasswordValidity(val),
          isTouched: true,
        },
      };
    case `USER_IMG_INPUT`:
      return { ...state, imgUrl: val };
    default:
      return state;
  }
};

export const SignUpPage = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const initialUserInfoState = {
    id: { value: '', isValid: null, isTouched: false },
    password: { value: '', isValid: null, isTouched: false },
    mainLocation: {
      locationIdx: null,
      locationName: null,
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

  const postBtnClickHandler = () => {
    console.log(2);
  };

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

  return (
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
            />
          )}
          {locationState && (
            <>
              <Button
                title="label"
                shape="large"
                state={locationState ? 'active' : 'default'}
                textAlign={locationState ? 'left' : 'center'}
                color={locationState ? 'systemBackground' : 'neutralTextStrong'}
                icon={locationState ? 'close' : 'plus'}
                hasBorder={true}
              />
              <Button
                title="label"
                shape="large"
                state={locationState ? 'active' : 'default'}
                color={locationState ? 'systemBackground' : 'neutralTextStrong'}
                textAlign={locationState ? 'left' : 'center'}
                icon={locationState ? 'close' : 'plus'}
                hasBorder={true}
              />
            </>
          )}
        </S.LocationButtonSection>
      </S.SignUpPage>
    </Layout>
  );
};

// alert text
// 로그인 화면에서는 아이디만 (비밀번호는 x)
// 가입화면에서는 아이디, 비밀번호 둘다
