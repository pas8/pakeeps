import { createReducer } from 'store/utils';
import * as types from './types';

export const defaultTheme: DefaultThemeInterface = {
  primaryMain: '#ffff8d',
  paperMain: '#424242',
  defaultBackgroundMain: '#282828',
  secondaryMain: '#00b0ff',
  type: 'dark',
  highEmphasis: 'rgba(255,255,255,0.8)',
  mediumEmphasis: 'rgba(255,255,255,0.6)',
  maxEmphasis: 'rgba(255,255,255,0.96)'
};

const colorInitialState = {
  breakpointsValues: { xs: 1, sm: 600, md: 960, lg: 1280, xl: 1920 },
  theme: defaultTheme,
  idColumnArr: {
    'column-1': ['1', '2', '3', '4'],
    'column-2': ['5', '6', '7', '8'],
    'column-3': ['9', '10', '11', '12'],
    'column-4': ['13', '14', '15', '16']
  }
};

const colorReducer = createReducer(colorInitialState)({
  [types.CHANGE_ONE_COLOR_COLUMN]: (state, { columnId, newArr }) => ({
    ...state,
    idColumnArr: {
      ...state.idColumnArr,
      [columnId]: newArr
    }
  }),
  [types.CHANGE_TWO_COLOR_COLUMN]: (state, { startColumn, finishColumn }) => ({
    ...state,
    idColumnArr: {
      ...state.idColumnArr,
      [startColumn.id]: startColumn.newArr,
      [finishColumn.id]: finishColumn.newArr
    }
  })
});

export default colorReducer;
