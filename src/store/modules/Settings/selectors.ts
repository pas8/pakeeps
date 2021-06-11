import { RootStoreType } from 'models/interfaces';
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
