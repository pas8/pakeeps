import { TypeNames } from './enums';
import { SettingsActionTypes, SettingsInitialStateType } from './types';

export const settingsInitialState: SettingsInitialStateType = {
  viewOfThemeChangerButton: 'iconButton', // 'iconButton' ||  'switch'
  maxSnack: 4,
  isUtilsHaveViewLikeInGoogleKeep: true,
  timeFormat: 'hh:mm',
  timeAndDateFromat: 'yyyy / MM / dd / hh:mm',
  isHeaderHavePaperColor: !true,
  ampm: false,
  navigationViewLike: 'pakeeps', //'telegram' || 'googleKeep' || 'pakeeps'
  positionOfFolderViewWithPakeepView: 'left', //'left' || 'bottom' || 'right'
  isFolderViewWithPakeepViewAlignToCenter: !true,
  isMenuHaveGitHubView: !true
};

export const SettingsReducer = (
  state = settingsInitialState,
  action: SettingsActionTypes
): SettingsInitialStateType => {
  switch (action.type) {
    // case TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS: {
    //   const { newThemeColors } = action.payload;

    //   const theme = { ...state.theme, ...newThemeColors };
    //   return { ...state, theme };
    // }
    case TypeNames.HANDLE_SETTING_PROPERTY:
      return { ...state, ...action.payload.property };
    // case TypeNames.HANDLE_SETTING_PROPERTY:
    //   return { ...state, ...action.payload };

    default:
      return state;
    //@ts-ignore
    // const x: never = action;
  }
};
