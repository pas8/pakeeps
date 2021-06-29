import { ColorInitialStateType, DefaultThemetype } from './interfaces';
import * as types from './types';

export const defaultTheme: DefaultThemetype = {
  primaryMain: '#ffff8d',
  paperMain: '#424242',
  defaultBackgroundMain: '#303030',
  secondaryMain: '#00b0ff',
  type: 'dark',
  highEmphasis: 'rgba(255,255,255,0.8)',
  mediumEmphasis: 'rgba(255,255,255,0.6)',
  maxEmphasis: 'rgba(255,255,255,0.96)'
};

export const colorInitialState = {
  breakpointsValues: { xs: 1, sm: 600, md: 960, lg: 1280, xl: 1920 },
  theme: defaultTheme,
  idColumnArr: {
    'column-1': ['1', '2', '3', '4'],
    'column-2': ['5', '6', '7', '8'],
    'column-3': ['9', '10', '11', '12'],
    'column-4': ['13', '14', '15', '16']
  }
};

// const colorReducer = createReducer(colorInitialState)({
//   [types.CHANGE_ONE_COLOR_COLUMN] : (state, { columnId, newArr }) => ({
//     ...state,
//     idColumnArr: {
//       ...state.idColumnArr,
//       [columnId]: newArr
//     }
//   }),
//   [types.CHANGE_TWO_COLOR_COLUMN]: (state, { startColumn, finishColumn }) => ({
//     ...state,
//     idColumnArr: {
//       ...state.idColumnArr,
//       [startColumn.id]: startColumn.newArr,
//       [finishColumn.id]: finishColumn.newArr
//     }
//   })
// });
export const ColorReducer = (state: ColorInitialStateType = colorInitialState, action: any): any => {
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
