
import * as types from './types';

export const toChangeOneColorColumn = (columnId, newArr) => ({
  type: types.CHANGE_ONE_COLOR_COLUMN,
  columnId,
  newArr
});

export const toChangeTwoColorColumn = (startColumn, finishColumn) => ({
  type: types.CHANGE_TWO_COLOR_COLUMN,
  startColumn,
  finishColumn
});
