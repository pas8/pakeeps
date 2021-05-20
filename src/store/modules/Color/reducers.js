import { createReducer } from 'store/utils';
import * as types from './types';

const colorInitialState = {
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
