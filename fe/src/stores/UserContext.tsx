import { USER_INFO_KEY } from '@constants/login';
import { useReducer, createContext, useEffect, Dispatch } from 'react';
import { getUserLocationInfo } from '@pages/LoginPage/LoginPage';

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
  const initial = userInfo.isLoggedIn === initialUserInfo.isLoggedIn;

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('loginToken');
    if (!userInfo.isLoggedIn && storedUserLoggedInInformation !== null) {
      const userInfo = localStorage.getItem(USER_INFO_KEY);
      if (!userInfo) return;
      const { memberIdx, loginId, imgUrl } = JSON.parse(userInfo);
      dispatch({
        type: 'LOGIN',
        payload: {
          isLoggedIn: true,
          memberIdx: memberIdx,
          loginId: loginId,
          imgUrl: imgUrl,
        },
      });
      getUserLocationInfo().then((data) => {
        dispatch({
          type: 'SET_LOCATION',
          payload: {
            main: {
              locationIdx: data.data.main.locationIdx,
              town: data.data.main.town,
            },
            sub: {
              locationIdx: data.data.sub.locationIdx,
              town: data.data.sub.town,
            },
          },
        });
      });
    }
  }, [initial]);

  return (
    <UserInfoContext.Provider value={userInfo}>
      <UserInfoDispatchContext.Provider value={dispatch}>
        {children}
      </UserInfoDispatchContext.Provider>
    </UserInfoContext.Provider>
  );
};
