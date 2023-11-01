import { State, Action } from '@type-store/services/signUp';

export const hasSelectedLocation = (userInfo) => {
  const { mainLocation } = userInfo;
  return mainLocation.locationIdx === null ? false : true;
};

export const checkIdValidity = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{3,12}$/;

  return regex.test(id);
};

export const checkPasswordValidity = (password: string): boolean => {
  const regex = /^[a-zA-Z0-9]{5,12}$/;
  return regex.test(password);
};

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
      if (typeof val !== 'string') {
        return { ...state, imgUrl: val.imgUrl, imgFile: val.imgFile };
      }
      break;
    case 'SET_LOCATION':
      if (typeof val === 'string') break;
      if (state.mainLocation.locationIdx === null) {
        return {
          ...state,
          mainLocation: {
            locationIdx: val.locationIdx,
            locationName: val.locationName,
            town: val.town,
          },
        };
      } else {
        return {
          ...state,
          subLocation: {
            locationIdx: val.locationIdx,
            locationName: val.locationName,
            town: val.town,
          },
        };
      }
    case 'REMOVE_LOCATION':
      if (typeof val !== 'string') break;
      if (val === state.mainLocation.town) {
        return {
          ...state,
          mainLocation: { ...state.subLocation },
          subLocation: {
            locationIdx: null,
            locationName: null,
            town: null,
          },
        };
      } else {
        return {
          ...state,
          subLocation: {
            locationIdx: null,
            locationName: null,
            town: null,
          },
        };
      }
    default:
      return state;
  }
};
