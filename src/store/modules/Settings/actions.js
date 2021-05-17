import * as types from './types';

export const toChangeViewOfThemeChangerButton = data => ({
  type: types.VIEW_OF_THEME_CHANGER_BUTTON,
  data
});

export const toChangeMaxSnackValue = snackNumber => ({
  type: types.MAX_SNACK_VALUE,
  snackNumber
});
