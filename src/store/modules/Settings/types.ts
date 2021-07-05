export type TimeFormatType = string;
export type TimeAndDateFromatType = string;

export type SettingsInitialStateType = {
  viewOfThemeChangerButton: 'iconButton' | 'switch';
  isHeaderHavePaperColor:boolean;
  maxSnack: number;
  isUtilsHaveViewLikeInGoogleKeep: boolean;
  timeFormat: TimeFormatType;
  timeAndDateFromat: TimeAndDateFromatType;
  navigationViewLike: 'telegram' | 'googleKeep' | 'pakeeps';
  positionOfFolderViewWithPakeepView: 'left' | 'bottom' | 'right';
  isFolderViewWithPakeepViewAlignToCenter: boolean;
  isMenuHaveGitHubView: boolean;
};
