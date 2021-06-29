import _ from 'lodash';
import { RootStoreType } from 'models/types';
import { createSelector } from 'reselect';


export const getColorsArr = createSelector([ colorsArr => colorsArr], colorsArr => colorsArr);

export const getIsMenuHaveGitHubView = createSelector(
  [({ settings: { isMenuHaveGitHubView } }: RootStoreType) => isMenuHaveGitHubView],
  isMenuHaveGitHubView => isMenuHaveGitHubView
);

