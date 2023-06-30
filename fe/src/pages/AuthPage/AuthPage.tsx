import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '@stores/UserContext';
import { useContext } from 'react';
import { API_URL } from '@constants/apis';
import { USER_INFO_KEY } from '@constants/login';

export const AuthPage = () => {
  const { loginHandler, setLocationHandler } = useContext(UserContext);
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
    const userInfo = await getGithubLoginToken(queryCode);
    if (!userInfo) {
      return;
    } // TODO: 에러처리
    localStorage.setItem(
      USER_INFO_KEY,
      JSON.stringify(userInfo.data.memberInfo)
    );
    const token = userInfo.data.token;
    const memberInfo = userInfo.data.memberInfo;
    loginHandler(token, memberInfo);

    const locationInfo = await getUserLocationInfo();
    const mainLocation = locationInfo.data.main;
    const subLocation = locationInfo.data.sub;
    setLocationHandler(mainLocation, subLocation);
    navigate('/');
  };

  return <></>;
};
