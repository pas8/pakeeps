import { createSelector } from 'reselect';

export const getNavigationViewLike = createSelector(
  [navigationViewLike => navigationViewLike],
  navigationViewLike => navigationViewLike
);
export const getPositionOfFolderViewWithPakeepView = createSelector([position => position], position => position);
