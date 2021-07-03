import _ from 'lodash';
import { RootStoreType } from 'models/types';
import { createSelector } from 'reselect';

export const getColorsArr = createSelector([colorsArr => colorsArr], colorsArr => colorsArr);

export const getIsMenuHaveGitHubView = createSelector(
  [({ settings: { isMenuHaveGitHubView } }: RootStoreType) => isMenuHaveGitHubView],
  isMenuHaveGitHubView => isMenuHaveGitHubView
);

export const getColorTheme = createSelector([({ color: { theme } }: RootStoreType) => theme], theme => theme);

export const getDefaultThemesArr = createSelector(
  [({ color: { defaultThemesToChoseArr } }: RootStoreType) => defaultThemesToChoseArr],
  defaultThemesToChoseArr => defaultThemesToChoseArr
);

export const getCapionsOfDefaultThemesArr = createSelector(
  [({ color: { defaultThemesToChoseArr } }: RootStoreType) => defaultThemesToChoseArr],
  defaultThemesToChoseArr => {
    const capitons = defaultThemesToChoseArr.map(el => el.caption);
    return capitons
  }
);
