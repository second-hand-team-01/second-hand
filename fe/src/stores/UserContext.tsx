import { USER_INFO_KEY } from '@constants/login';
import { useReducer, createContext, useEffect, Dispatch } from 'react';

interface UserInfo {
  isLoggedIn: boolean | null;
  memberIdx: number | null;
  loginId: string | null;
  imgUrl: string | null;
  main?: Location | null;
  sub?: Location | null;
}

interface Location {
  locationIdx: number | null;
  town: string | null;
}

type UserContextDispatch = Dispatch<UserAction>;

type UserAction =
  | { type: 'LOGIN'; payload: UserInfo }
  | { type: 'SET_LOCATION'; payload: { main: Location; sub: Location } }
  | { type: 'SET_USER_LOCATION'; payload: Location }
  | { type: 'LOGOUT'; payload: null };

export const reducer = (state: UserInfo, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        memberIdx: payload?.memberIdx,
        loginId: payload?.loginId,
        imgUrl: payload?.imgUrl,
      };

    case 'SET_LOCATION':
      return {
        ...state,
        main: {
          locationIdx: payload?.main.locationIdx,
          town: payload?.main.town,
        },
        sub: {
          locationIdx: payload?.sub.locationIdx,
          town: payload?.sub.town,
        },
      };

    case 'SET_USER_LOCATION':
      return {
        ...payload,
      };

    case 'LOGOUT':
      return {
        isLoggedIn: false,
        memberIdx: null,
        loginId: null,
        imgUrl: null,
        main: {
          locationIdx: null,
          town: null,
        },
        sub: {
          locationIdx: null,
          town: null,
        },
      };
    default:
      throw new Error('user state: 타입이 지정되지 않았어요.');
  }
};

const initialUserInfo: UserInfo = {
  isLoggedIn: false,
  memberIdx: null,
  loginId: null,
  imgUrl: null,
  main: {
    locationIdx: null,
    town: null,
  },
  sub: {
    locationIdx: null,
    town: null,
  },
};

export const UserInfoContext = createContext<UserInfo | null>(null);
export const UserInfoDispatchContext =
  createContext<UserContextDispatch | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, dispatch] = useReducer(reducer, initialUserInfo);
  console.log(userInfo);
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('loginToken');
    if (!userInfo.isLoggedIn && storedUserLoggedInInformation !== null) {
      // 로그인 토큰이 존재하면 다시 로그인 API 호출하는 로직 만들기
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

      dispatch({ type: 'LOGIN', payload: JSON.parse(userInfo) });
    }
  }, [userInfo]);

  return (
    <UserInfoContext.Provider value={userInfo}>
      <UserInfoDispatchContext.Provider value={dispatch}>
        {children}
      </UserInfoDispatchContext.Provider>
    </UserInfoContext.Provider>
  );
};
