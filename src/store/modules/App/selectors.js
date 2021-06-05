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

export const getPakeeps = createSelector([pakeeps => pakeeps], pakeeps => pakeeps);
export const getPakeepsOrderNames = createSelector([orderNames => orderNames], orderNames => orderNames);
export const getIsUsePreviuosOrder = createSelector([bool => bool], bool => bool);

export const getPinnedPakeepsOrderNames = createSelector([orderNames => orderNames], orderNames => orderNames);

export const getSelectedPakeepsId = createSelector(
  [selectedPakeepsId => selectedPakeepsId],
  selectedPakeepsId => selectedPakeepsId
);

export const getIsCancelSelectedPakeepsId = createSelector([status => status], status => status);

export const getSelectedPakeep = createArraySelector(
  [selectedPakeepsIdArr => selectedPakeepsIdArr, (selectedPakeepsIdArr, pakeeps) => pakeeps],
  (selectedPakeepsId, pakeeps) => _.find(pakeeps, ({ id }) => id === selectedPakeepsId)
);

export const getGlobalEventsArr = createSelector([globalEvents => globalEvents], globalEvents => globalEvents);
