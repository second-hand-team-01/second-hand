import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '@stores/UserContext';
import { useContext } from 'react';
import { API_URL } from '@constants/apis';

export const AuthPage = () => {
  const { loginHandler, setLocationHandler } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryCode = new URLSearchParams(location.search).get('code');

  // TODO: 에러 핸들링 필요
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
    console.log(userInfo);
    const token = userInfo.data.token;
    const memberInfo = userInfo.data.memberInfo;
    loginHandler(token, memberInfo);

    const userLocationInfo = await getUserLocationInfo();
    const mainLocation = userLocationInfo.data.main;
    const subLocation = userLocationInfo.data.sub;
    setLocationHandler(mainLocation, subLocation);
    navigate('/');
  };

  return <></>;
};
