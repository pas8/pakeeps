import { $Values, Optional } from 'utility-types';
import { TypeNames } from './enums';

export type TimeFormatType = string;
export type TimeAndDateFromatType = string;

export type PayloadTypes = {
  [TypeNames.HANDLE_SETTING_PROPERTY]: {
    property: Optional<SettingsInitialStateType>;
  };
};

export type ActionsValueTypes = {
  toChangeSettingProperty: {
    type: typeof TypeNames.HANDLE_SETTING_PROPERTY;
    payload: PayloadTypes[TypeNames.HANDLE_SETTING_PROPERTY];
  };
};

export type SettingsActionTypes = $Values<ActionsValueTypes>;

export type SettingsInitialStateType = {
  viewOfThemeChangerButton: 'iconButton' | 'switch';
  isHeaderHavePaperColor: boolean;
  maxSnack: number;
  isUtilsHaveViewLikeInGoogleKeep: boolean;
  timeFormat: TimeFormatType;
  timeAndDateFromat: TimeAndDateFromatType;
  navigationViewLike: 'telegram' | 'googleKeep' | 'pakeeps';
  positionOfFolderViewWithPakeepView: 'left' | 'bottom' | 'right';
  isFolderViewWithPakeepViewAlignToCenter: boolean;
  isMenuHaveGitHubView: boolean;
};
