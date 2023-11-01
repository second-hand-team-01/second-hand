import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LoginPageStyle';
import {
  Button,
  TextInput,
  Profile,
  Layout,
  Dialog,
} from '@components/commons';
import { UserInfoContext, UserInfoDispatchContext } from '@stores/UserContext';
import { OAUTH_CLIENT_ID, USER_INFO_KEY } from '@constants/login';
import { URL, API_URL } from '@constants/apis';

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

export const getUserLocationInfo = async () => {
  const token = localStorage.getItem('loginToken');
  const response = await fetch(`${API_URL}/location`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
};

export const LoginPage = () => {
  const userInfo = useContext(UserInfoContext);
  const userInfoDispatch = useContext(UserInfoDispatchContext);
  const navigate = useNavigate();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [enteredId, setEnteredId] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const idChangeHandler = ({ target: { value } }) => {
    setEnteredId(value);
  };

  const passwordChangeHandler = ({ target: { value } }) => {
    setEnteredPassword(value);
  };

  const loginBtnHandler = async () => {
    if (enteredId === '' && enteredPassword === '') {
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
      setDialogOpen(true);
      return;
    } else if (enteredId === '') {
      setErrorMessage('아이디를 입력해주세요.');
      setDialogOpen(true);
      return;
    } else if (enteredPassword === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      setDialogOpen(true);
      return;
    }
    try {
      const userInfoData = await authenticateUser(enteredId, enteredPassword);
      localStorage.setItem('loginToken', userInfoData.token);
      userInfoDispatch &&
        userInfoDispatch({
          type: 'LOGIN',
          payload: {
            isLoggedIn: true,
            memberIdx: userInfoData.memberInfo.memberIdx,
            loginId: userInfoData.memberInfo.loginId,
            imgUrl: userInfoData.memberInfo.imgUrl,
          },
        });

      const userLocationInfo = await getUserLocationInfo();
      userInfoDispatch &&
        userInfoDispatch({
          type: 'SET_LOCATION',
          payload: {
            main: {
              locationIdx: userLocationInfo.data.main.locationIdx,
              town: userLocationInfo.data.main.town,
            },
            sub: {
              locationIdx: userLocationInfo.data.sub.locationIdx,
              town: userLocationInfo.data.sub.town,
            },
          },
        });

      localStorage.setItem(
        USER_INFO_KEY,
        JSON.stringify(userInfoData.memberInfo)
      );

      navigate('/');
    } catch (error) {
      setErrorMessage((error as Error).message);
      setDialogOpen(true);
    }
  };

  const logoutBtnHandler = () => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem(USER_INFO_KEY);
    userInfoDispatch &&
      userInfoDispatch({
        type: 'LOGOUT',
        payload: null,
      });
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
          {!userInfo?.isLoggedIn && (
            <S.InputSection>
              <TextInput
                shape="large"
                value={enteredId}
                placeholder="아이디를 입력하세요"
                label="아이디"
                onChange={idChangeHandler}
              />
              <TextInput
                type="password"
                shape="large"
                value={enteredPassword}
                placeholder="비밀번호를 입력하세요"
                label="비밀번호"
                onChange={passwordChangeHandler}
              />
            </S.InputSection>
          )}
          {userInfo?.isLoggedIn && (
            <S.ProfileSection>
              <Profile
                imgUrl={userInfo.imgUrl ? userInfo.imgUrl : ''}
                size={130}
                isEditable={true}
              />
              <S.UserId>{userInfo.loginId}</S.UserId>
            </S.ProfileSection>
          )}
          {!userInfo?.isLoggedIn && (
            <S.LoginButtonSection>
              <Button title="로그인" state="active" onClick={loginBtnHandler} />
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
          {userInfo?.isLoggedIn && (
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
