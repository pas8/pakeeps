import { RootStoreType } from 'models/types';
import { createSelector } from 'reselect';

export const getNavigationViewLike = createSelector(
  [({ settings: { navigationViewLike } }: RootStoreType) => navigationViewLike],
  navigationViewLike => navigationViewLike
);
export const getPositionOfFolderViewWithPakeepView = createSelector(
  [({ settings }: RootStoreType) => settings.positionOfFolderViewWithPakeepView],
  position => position
);
export const getIsFolderViewWithPakeepViewAlignToCenter = createSelector(
  [({ settings }: RootStoreType) => settings.isFolderViewWithPakeepViewAlignToCenter],
  bool => bool
);

export const getTimeFormat = createSelector(
  [({ settings: { timeFormat } }: RootStoreType) => timeFormat],
  timeFormat => timeFormat
);

export const getTimeAndDateFromat = createSelector(
  [({ settings: { timeAndDateFromat } }: RootStoreType) => timeAndDateFromat],
  timeAndDateFromat => timeAndDateFromat
);

export const getIsUtilsHaveViewLikeInGoogleKeep = createSelector(
  [({ settings: { isUtilsHaveViewLikeInGoogleKeep } }: RootStoreType) => isUtilsHaveViewLikeInGoogleKeep],
  isUtilsHaveViewLikeInGoogleKeep => isUtilsHaveViewLikeInGoogleKeep
);

export const getIsHeaderHavePaperColor = createSelector(
  [({ settings: { isHeaderHavePaperColor } }: RootStoreType) => isHeaderHavePaperColor],
  isHeaderHavePaperColor => isHeaderHavePaperColor
);

export const getAmpmStatus = createSelector([({ settings: { ampm } }: RootStoreType) => ampm], ampm => ampm);

export const getViewOfThemeChangerButton = createSelector(
  [({ settings: { viewOfThemeChangerButton } }: RootStoreType) => viewOfThemeChangerButton],
  viewOfThemeChangerButton => viewOfThemeChangerButton
);


