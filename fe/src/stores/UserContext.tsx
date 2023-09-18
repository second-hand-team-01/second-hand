import { USER_INFO_KEY } from '@constants/login';
import { useState, useReducer, createContext, useEffect } from 'react';

interface UserInfo {
  memberIdx: number | null;
  loginId: string | null;
  imgUrl: string | null;
  main?: {
    locationIdx: number | null;
    locationName: string | null;
    town: string | null;
  };
  sub?: {
    locationIdx: number | null;
    locationName: string | null;
    town: string | null;
  };
}

export const initialUserInfo = {
  memberIdx: null,
  loginId: null,
  imgUrl: null,
  main: {
    locationIdx: null,
    locationName: null,
    town: null,
  },
  sub: {
    locationIdx: null,
    locationName: null,
    town: null,
  },
};

// TODO: any 타입 사용 수정하기

export const reducer = (state: UserInfo, { type, payload }: any) => {
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        memberIdx: payload?.memberIdx,
        loginId: payload?.loginId,
        imgUrl: payload?.imgUrl,
      };

    case 'SET_LOCATION':
      return {
        ...state,
        main: {
          locationIdx: payload?.main.locationIdx,
          locationName: payload?.main.locationName,
          town: payload?.main.town,
        },
        sub: {
          locationIdx: payload?.sub.locationIdx,
          locationName: payload?.sub.locationName,
          town: payload?.sub.town,
        },
      };

    case 'SET_USER_LOCATION':
      return {
        ...payload,
      };

    case 'LOGOUT':
      return {
        memberIdx: null,
        loginId: null,
        imgUrl: null,
        main: {
          locationIdx: null,
          locationName: null,
          town: null,
        },
        sub: {
          locationIdx: null,
          locationName: null,
          town: null,
        },
      };
    default:
      throw new Error('user state: 타입이 지정되지 않았어요.');
  }
};

export const UserContext = createContext<any>(initialUserInfo);

export const UserContextProvider = ({ children }) => {
  const [userInfo, dispatch] = useReducer(reducer, initialUserInfo);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('loginToken');
    if (storedUserLoggedInInformation !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const isInitial =
      JSON.stringify(userInfo) === JSON.stringify(initialUserInfo);
    if (isInitial) {
      const userInfo = localStorage.getItem(USER_INFO_KEY);
      if (!userInfo) return;
      if (userInfo === 'undefined') {
        return localStorage.removeItem(USER_INFO_KEY);
      }
      if (!JSON.parse(userInfo)) {
        return;
      }

      dispatch({ type: 'SET_USER', payload: JSON.parse(userInfo) });
    }
  }, [userInfo]);

  const loginHandler = (
    token: string,
    memberInfo: {
      memberIdx: number;
      loginId: string;
      imgUrl: string | null;
    }
  ) => {
    localStorage.setItem('loginToken', token);
    dispatch({
      type: 'SET_USER',
      payload: {
        memberIdx: memberInfo.memberIdx,
        loginId: memberInfo.loginId,
        imgUrl: memberInfo.imgUrl,
      },
    });
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem(USER_INFO_KEY);
    dispatch({
      type: 'LOGOUT',
    });
    setIsLoggedIn(false);
  };

  const setLocationHandler = (main, sub) => {
    dispatch({
      type: 'SET_LOCATION',
      payload: {
        main: {
          locationIdx: main.locationIdx,
          locationName: main.locationName,
          town: main.town,
        },
        sub: {
          locationIdx: sub.locationIdx,
          locationName: sub.locationName,
          town: sub.town,
        },
      },
    });
  };

  if (
    userInfo.memberIdx === null &&
    localStorage.getItem('loginToken') !== null
  ) {
    localStorage.removeItem('loginToken');
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userInfo,
        loginHandler,
        logoutHandler,
        setLocationHandler,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
