import _ from 'lodash';
import { createSelector } from 'reselect';
import { createArraySelector } from 'reselect-map';

const getPakeeplLabels = labels => labels;
const getGlobalLabels = (labels, globalLabels) => globalLabels;

export const getFilteredLabels = createArraySelector([getPakeeplLabels, getGlobalLabels], (pakeepId, globalLabels) =>
  _.find(globalLabels, ({ id }) => id === pakeepId)
);



export const getCurrentFolderPropertyIdx = createSelector(
  [currentFolderPropertyIdx => currentFolderPropertyIdx],
  currentFolderPropertyIdx => currentFolderPropertyIdx
);

export const getFolders = createSelector([folders => folders], folders => folders);

export const getMenuOpenStatus = createSelector([isMenuOpen => isMenuOpen], isMenuOpen => isMenuOpen);
export const getDrawerWidth = createSelector([drawerWidth => drawerWidth], drawerWidth => drawerWidth);
export const getLabels = createSelector([labels => labels], labels => labels);

export const getDefaultFolderArr = createSelector([arr => arr], arr => arr);
