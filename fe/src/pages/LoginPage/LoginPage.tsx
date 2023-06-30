import { useState, useReducer, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LoginPageStyle';
import {
  Button,
  TextInput,
  Profile,
  Layout,
  Dialog,
} from '@components/commons';
import { UserContext } from '@stores/UserContext';
import { OAUTH_CLIENT_ID, USER_INFO_KEY } from '@constants/login';
import { URL, API_URL } from '@constants/apis';

const checkIdValidity = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(id);
};

const checkPasswordValidity = (password: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(password);
};

interface State {
  value: string;
  isValid: boolean | null;
}
interface Action {
  type: string;
  val: string;
}

const idReducer = (state: State, action: Action) => {
  const { type, val } = action;
  switch (type) {
    case 'USER_INPUT':
      return {
        value: val,
        isValid: checkIdValidity(val),
      };
    case `INPUT_BLUR`:
      return {
        value: state.value,
        isValid: checkIdValidity(val),
      };
    default:
      return state;
  }
};

const passwordReducer = (state: State, action: Action): State => {
  const { type, val } = action;
  switch (type) {
    case 'USER_INPUT':
      return {
        value: val,
        isValid: checkPasswordValidity(val),
      };
    case `INPUT_BLUR`:
      return {
        value: state.value,
        isValid: checkPasswordValidity(val),
      };
    default:
      return state;
  }
};

export const LoginPage = () => {
  const { isLoggedIn, userInfo, loginHandler, logoutHandler } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [formIsValid, setFormIsValid] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initialIdState = { value: '', isValid: null };
  const initialPasswordState = { value: '', isValid: null };

  const [idState, dispatchId] = useReducer(idReducer, initialIdState);
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );
  const { value: enteredId, isValid: idIsValid } = idState;
  const { value: enteredPassword, isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(!!idIsValid && !!passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [idIsValid, passwordIsValid]);

  const idChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatchId({ type: 'USER_INPUT', val: value });
  };

  const validateId = () => {
    dispatchId({ type: 'INPUT_BLUR', val: idState.value });
  };

  const passwordChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({ type: 'USER_INPUT', val: value });
  };

  const validatePassword = () => {
    dispatchPassword({ type: 'INPUT_BLUR', val: passwordState.value });
  };

  const authenticateUser = async (
    id: string | number,
    password: string | number
  ) => {
    const response = await fetch(`${API_URL}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ loginId: id, password: password }),
    });

    const userInfo = await response.json();

    if (!response.ok) {
      throw new Error(userInfo.message);
    }

    return userInfo.data;
  };

  const loginBtnHandler = async () => {
    try {
      const data = await authenticateUser(enteredId, enteredPassword);
      loginHandler(data.token, data.memberInfo);

      localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.memberInfo));
      navigate('/');
    } catch (error) {
      setErrorMessage((error as Error).message);
      setDialogOpen(true);
    }
  };

  const logoutBtnHandler = () => {
    logoutHandler();
    navigate('/profile');
  };

  const scope = 'user';
  const redirectUri = `${URL}/redirect/oauth`;
  const clientId = OAUTH_CLIENT_ID;

  const githubLoginBtnHandler = () => {
    window.location.href = `https://github.com/login/oauth/authorize?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&scope=${scope}`;
  };

  const signUpBtnHandler = () => {
    navigate('/signUp');
  };

  return (
    <>
      <Layout
        headerOption={{
          type: 'nav',
          navbarOptions: {
            title: '내 계정',
          },
        }}
        footerOption={{ type: 'tab' }}
      >
        <S.LoginPage>
          {!isLoggedIn && (
            <S.InputSection>
              <TextInput
                shape="large"
                value={enteredId}
                placeholder="아이디를 입력하세요"
                label="아이디"
                onChange={idChangeHandler}
                onBlur={validateId}
              />
              <TextInput
                type="password"
                shape="large"
                value={enteredPassword}
                placeholder="비밀번호를 입력하세요"
                label="비밀번호"
                onChange={passwordChangeHandler}
                onBlur={validatePassword}
              />
            </S.InputSection>
          )}
          {isLoggedIn && (
            <S.ProfileSection>
              <Profile
                imgUrl={userInfo.imgUrl ? userInfo.imgUrl : ''}
                size={130}
                isEditable={true}
              />
              <S.UserId>{userInfo.loginId}</S.UserId>
            </S.ProfileSection>
          )}
          {!isLoggedIn && (
            <S.LoginButtonSection>
              <Button
                title="로그인"
                state={formIsValid ? 'active' : 'disabled'}
                onClick={loginBtnHandler}
              />
              <Button
                title="Github 계정으로 로그인"
                state="active"
                backgroundColor="neutralText"
                onClick={githubLoginBtnHandler}
              />
              <Button
                title="회원가입"
                shape="small"
                state="default"
                onClick={signUpBtnHandler}
              />
            </S.LoginButtonSection>
          )}
          {isLoggedIn && (
            <S.LoginButtonSection>
              <Button
                title="로그아웃"
                state="active"
                onClick={logoutBtnHandler}
              />
            </S.LoginButtonSection>
          )}
        </S.LoginPage>
      </Layout>
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
