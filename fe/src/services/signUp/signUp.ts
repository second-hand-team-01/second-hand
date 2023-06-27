import { State, Action } from '@type-store/services/signUp';

export const hasLocationData = (userInfo) => {
  const { mainLocation } = userInfo;
  return mainLocation.locationIdx === null ? false : true;
};

export const checkIdValidity = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{3,12}$/;

  return regex.test(id);
};

export const checkPasswordValidity = (password: string): boolean => {
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  return regex.test(password);
};

// TODO : any 해결하기
export const userInfoReducer = (state: State, action: Action): any => {
  const { type, val } = action;
  switch (type) {
    case 'USER_ID_INPUT':
      if (typeof val === 'string') {
        return { ...state, id: { value: val, isValid: checkIdValidity(val) } };
      }
      break;
    case `INPUT_ID_BLUR`:
      if (typeof val === 'string') {
        return {
          ...state,
          id: {
            value: state.id.value,
            isValid: checkIdValidity(val),
            isTouched: true,
          },
        };
      }
      break;
    case 'USER_PASSWORD_INPUT':
      if (typeof val === 'string') {
        return {
          ...state,
          password: { value: val, isValid: checkPasswordValidity(val) },
        };
      }
      break;
    case `INPUT_PASSWORD_BLUR`:
      if (typeof val === 'string') {
        return {
          ...state,
          password: {
            value: state.password.value,
            isValid: checkPasswordValidity(val),
            isTouched: true,
          },
        };
      }
      break;
    case `USER_IMG_INPUT`:
      if (typeof val === 'string') {
        return { ...state, imgUrl: val };
      }
      break;
    case 'SUB_LOCATION_INPUT':
      if (typeof val !== 'string') {
        return {
          ...state,
          subLocation: {
            locationIdx: val.locationIdx,
            locationName: val.locationName,
          },
        };
      }
      break;
    case 'SUB_LOCATION_REMOVE':
      return {
        ...state,
        subLocation: {
          locationIdx: null,
          locationName: null,
        },
      };
    case 'MAIN_LOCATION_REMOVE':
      return {
        ...state,
        mainLocation: { ...state.subLocation },
        subLocation: {
          locationIdx: null,
          locationName: null,
        },
      };
    default:
      return state;
  }
};
