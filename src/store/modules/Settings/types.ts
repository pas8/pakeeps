export type TimeFormatType = string;
export type TimeAndDateFromatType = string;

export type SettingsInitialStateType = {
  viewOfThemeChangerButton: 'iconButton' | 'switch';
  maxSnack: number;
  utilsViewLikeInGoogleKeep: number;
  timeFormat: TimeFormatType;
  timeAndDateFromat: TimeAndDateFromatType;
  navigationViewLike: 'telegram' | 'googleKeep' | 'pakeeps';
  positionOfFolderViewWithPakeepView: 'left' | 'bottom' | 'right';
  isFolderViewWithPakeepViewAlignToCenter: boolean;
};
