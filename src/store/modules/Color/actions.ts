import { TypeNames } from './enums';
import { ColorActionTypes, PayloadTypes } from './types';

export const toChangeOneColorColumn = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ONE_COLOR_COLUMN]
): ColorActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_ONE_COLOR_COLUMN,
  payload
});

export const toChangeTwoColorColumn = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_TWO_COLOR_COLUMN]
): ColorActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_TWO_COLOR_COLUMN,
  payload
});

export const toChangeThemeColors = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS]): ColorActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_THEME_COLORS,
  payload
});

export const toChangeDefaultThemesArr = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_DEFAULT_THEMES_ARR]
): ColorActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_DEFAULT_THEMES_ARR,
  payload
});
