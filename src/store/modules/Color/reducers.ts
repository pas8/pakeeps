import { TypeNames } from './enums';
import { ColorActionTypes, DefaultThemeType } from './types';

// export const defaultTheme: DefaultThemeType = {
//   primaryMain: 'rgba(0,255,0,1)',
//   paperMain: '#ffffffCC',
//   defaultBackgroundMain: '#fff',
//   secondaryMain: '#00b0ff',
//   type: 'light',
//   highEmphasis: 'rgba(0,0,0,0.8)',
//   mediumEmphasis: 'rgba(0,0,0,0.6)',
//   maxEmphasis: 'rgba(0,0,0,0.96)'
// };

export const defaultTheme: DefaultThemeType = {
  primaryMain: '#ffff8d',
  caption: 'Classic',
  paperMain: '#424242',
  defaultBackgroundMain: '#303030',
  secondaryMain: '#00b0ff',
  isColorRandom: false,
  type: 'dark',
  textColor: '#ffffff'
};

export const colorInitialState = {
  breakpointsValues: { xs: 1, sm: 600, md: 960, lg: 1280, xl: 1920 },
  theme: defaultTheme,
  textColorCoefficients: {
    max: 0.96,
    high: 0.8,
    medium: 0.6,
    min: 0.42
  },
  idColumnArr: {
    'column-1': ['1', '2', '3', '4'],
    'column-2': ['5', '6', '7', '8'],
    'column-3': ['9', '10', '11', '12'],
    'column-4': ['13', '14', '15', '16']
  },
  defaultThemesToChoseArr: [
    {
      caption: 'Classic',
      background: { default: '#303030', paper: '#424242', type: 'dark', color: '#ffffff' }
    },
    {
      caption: 'Full dark',
      background: { default: '#080808', paper: '#202020', type: 'dark', color: '#ffffff' }
    },

    {
      caption: 'Dark blue',
      background: { default: '#000016', paper: '#000042', type: 'dark', color: '#ffffff' }
    },

    {
      caption: 'Dark red',
      background: { default: '#160000', paper: '#420000', type: 'dark', color: '#ffffff' }
    },

    {
      caption: 'Full White',
      background: { default: 'rgb(242, 242, 242)', paper: 'rgb(220, 220, 220)', type: 'light', color: '#000000' }
    }
    // {
    //   caption: '',
    //   background: { default: 'rgb(242, 242, 242)', paper: 'rgb(220, 220, 220)', type: 'light' }
    // }
  ]
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
export const ColorReducer = (state = colorInitialState, action: ColorActionTypes): any => {
  switch (action.type) {
    case TypeNames.HANDLE_CHANGE_THEME_COLORS: {
      const { newThemeColors } = action.payload;

      const theme = { ...state.theme, ...newThemeColors };
      return { ...state, theme };
    }

    case TypeNames.HANDLE_CHANGE_DEFAULT_THEMES_ARR: {
      const { newThemeElement } = action.payload;

      const defaultThemesToChoseArr = [...state.defaultThemesToChoseArr, newThemeElement];
      return { ...state, defaultThemesToChoseArr };
    }
    // case '': {
    // return { ...state, ...action.payload };
    // }

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
