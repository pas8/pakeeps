import { SettingsInitialStateType } from './types';

const settingsInitialState: SettingsInitialStateType = {
  viewOfThemeChangerButton: 'iconButton', // 'iconButton' ||  'switch'
  maxSnack: 4,
  isUtilsHaveViewLikeInGoogleKeep: true,
  timeFormat: 'hh:mm',
  timeAndDateFromat: 'yyyy / MM / dd / hh:mm',
  navigationViewLike: 'pakeeps', //'telegram' || 'googleKeep' || 'pakeeps'
  positionOfFolderViewWithPakeepView: 'left', //'left' || 'bottom' || 'right'
  isFolderViewWithPakeepViewAlignToCenter: !true
};

// const settingsReducer = createReducer(settingsInitialState)({
// [types.VIEW_OF_THEME_CHANGER_BUTTON]: (state, { data }) => ({ ...state, viewOfThemeChangerButton: data }),
// [types.MAX_SNACK_VALUE]: (state, { snackNumber }) => ({ ...state, maxSnack: snackNumber })
// });

export const SettingsReducer = (state = settingsInitialState, action: any): any => {
  return state;
};

// export default settingsReducer;
