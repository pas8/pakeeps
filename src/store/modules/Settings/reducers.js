import { createReducer } from 'store/utils';
import * as types from './types';

const settingsInitialState = { viewOfThemeChangerButton: 'iconButton', maxSnack: 4 };

const settingsReducer = createReducer(settingsInitialState)({
  [types.VIEW_OF_THEME_CHANGER_BUTTON]: (state, { data }) => ({ ...state, viewOfThemeChangerButton: data }),
  [types.MAX_SNACK_VALUE]: (state, { snackNumber }) => ({ ...state, maxSnack: snackNumber })
});

export default settingsReducer;
