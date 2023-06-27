import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '@stores/UserContext';
import { useContext } from 'react';

export const AuthPage = () => {
  const { loginHandler } = useContext(UserContext);
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

  useEffect(() => {
    runGetLoginTokenAPI();
  }, []);

  const runGetLoginTokenAPI = async () => {
    const userInfo = await getGithubLoginToken(queryCode);
    const token = userInfo.data.token;
    const memberInfo = userInfo.data.memberInfo;

    loginHandler(token, memberInfo);
    navigate('/');
  };

  return <></>;
};
