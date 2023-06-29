import { useState, useReducer, createContext, useEffect } from 'react';

interface UserInfo {
  memberIdx: number | null;
  loginId: string | null;
  imgUrl: string | null;
  main?: {
    locationIdx: number | null;
    locationName: string | null;
  };
  sub?: {
    locationIdx: number | null;
    locationName: string | null;
  };
}

export const initialUserInfo = {
  memberIdx: null,
  loginId: null,
  imgUrl: null,
  main: {
    locationIdx: null,
    locationName: null,
  },
  sub: {
    locationIdx: null,
    locationName: null,
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
        },
        sub: {
          locationIdx: payload?.sub.locationIdx,
          locationName: payload?.sub.locationName,
        },
      };
    case 'LOGOUT':
      return {
        memberIdx: null,
        loginId: null,
        imgUrl: null,
        main: {
          locationIdx: null,
          locationName: null,
        },
        sub: {
          locationIdx: null,
          locationName: null,
        },
      };
    default:
      throw new Error('user state: 타입이 지정되지 않았어요.');
  }
};

// TODO : any 타입 수정하기
export const UserContext = createContext<any>(initialUserInfo);

export const UserContextProvider = ({ children }) => {
  const [userInfo, dispatch] = useReducer(reducer, initialUserInfo);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('loginToken');

    if (storedUserLoggedInInformation !== null) {
      setIsLoggedIn(true);
    }
  }, []);

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
        },
        sub: {
          locationIdx: sub.locationIdx,
          locationName: sub.locationName,
        },
      },
    });
  };

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
