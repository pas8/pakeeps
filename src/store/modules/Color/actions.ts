import { TypeNames } from './enums';
import { ColorActionTypes, PayloadTypes } from './types';

// export const toChangeOneColorColumn = (columnId, newArr) => ({
//   type: types.CHANGE_ONE_COLOR_COLUMN,
//   columnId,
//   newArr
// });

// export const toChangeTwoColorColumn = (startColumn, finishColumn) => ({
//   type: types.CHANGE_TWO_COLOR_COLUMN,
//   startColumn,
//   finishColumn
// });

export const toChangeThemeColors = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS]): ColorActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_THEME_COLORS,
  payload
});
