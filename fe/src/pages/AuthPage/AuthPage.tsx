import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserInfoDispatchContext } from '@stores/UserContext';
import { useContext } from 'react';
import { API_URL } from '@constants/apis';
import { USER_INFO_KEY } from '@constants/login';

export const AuthPage = () => {
  const userInfoDispatch = useContext(UserInfoDispatchContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryCode = new URLSearchParams(location.search).get('code');

  const getGithubLoginToken = async (code: string | null) => {
    const response = await fetch(
      `https://www.guardiansofthecodesquad.site/login/oauth/github?code=${code}`
    );
    const data = await response.json();
    return data;
  };

  const getUserLocationInfo = async () => {
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

  useEffect(() => {
    runGetLoginUserInfoAPI();
  }, []);

  const runGetLoginUserInfoAPI = async () => {
    const userInfoData = await getGithubLoginToken(queryCode);
    if (!userInfoData) {
      return;
    } // TODO: 에러처리

    const token = userInfoData.data.token;
    const memberInfo = userInfoData.data.memberInfo;
    localStorage.setItem('loginToken', token);
    userInfoDispatch &&
      userInfoDispatch({
        type: 'LOGIN',
        payload: {
          isLoggedIn: true,
          memberIdx: memberInfo.memberIdx,
          loginId: memberInfo.loginId,
          imgUrl: memberInfo.imgUrl,
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
  };

  return <></>;
};
