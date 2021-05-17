import { createReducer } from 'store/utils';
import * as types from './types';

const colorInitialState = {
  colorsArr: {
    'column-1': [{ colorName: 'deepOrange' }, { colorName: 'orange' }, { colorName: 'amber' }, { colorName: 'yellow' }],
    'column-2': [{ colorName: 'lime' }, { colorName: 'lightGreen' }, { colorName: 'green' }, { colorName: 'teal' }],
    'column-3': [{ colorName: 'cyan' }, { colorName: 'lightBlue' }, { colorName: 'blue' }, { colorName: 'indigo' }],
    'column-4': [{ colorName: 'deepPurple' }, { colorName: 'purple' }, { colorName: 'pink' }, { colorName: 'red' }]
  }
};

const colorReducer = createReducer(colorInitialState)({
  [types.CHANGE_ONE_COLOR_COLUMN]: (state, { columnId, newArr }) => ({
    ...state,
    colorsArr: {
      ...state.colorsArr,
      [columnId]: newArr
    }
  }),
  [types.CHANGE_TWO_COLOR_COLUMN]: (state, { startColumn, finishColumn }) => ({
    ...state,
    colorsArr: {
      ...state.colorsArr,
      [startColumn.id]: startColumn.newArr,
      [finishColumn.id]: finishColumn.newArr
    }
  })
});

export default colorReducer;
