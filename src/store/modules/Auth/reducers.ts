import { NONE } from 'models/denotation';
import { TypeNames } from './enums';
import { AuthActionTypes, AuthInitialStateType } from './types';

const authInitialState: AuthInitialStateType = {
  isLogined: NONE,
  isAnonymous: false,
  isError: false,
  errorMessage: ''
};

export const ColorReducer = (state = authInitialState, action: AuthActionTypes): any => {
  switch (action.type) {
    // case TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS: {
    //   const { newThemeColors } = action.payload;

    //   const theme = { ...state.theme, ...newThemeColors };
    //   return { ...state, theme };
    // }

    case TypeNames.HANDLE_CHANGE_LOGIN_STATUS:
    case TypeNames.HANDLE_CHANGE_ERROR_MESSAGE:
    case TypeNames.HANDLE_CHANGE_ERROR_STATUS:
    case TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS:
      return { ...state, ...action.payload };

    default:
      //@ts-ignore
      const x: never = action;
  }
  return state;
};

// const ColorReducer = (state = colorInitialState, action: AppActionTypes): AppInitialStateInteface => {
//   if (!('type' in action) || !TypeNames) return state;
//   switch (action.type) {
//     case TypeNames.CHANGE_ONE_COLOR_COLUMN: {
//       return { ...state, ...action.payload };
//     }

//     default:
//       //@ts-ignore
//       const x: never = action;
//   }
//   return state;
// };

// export default ColorReducer;
