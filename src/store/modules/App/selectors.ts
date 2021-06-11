import { LabelElementInterface } from './types';
import { RootStoreType } from 'models/interfaces';
import _ from 'lodash';
import { createSelector } from 'reselect';
import { createArraySelector } from 'reselect-map';

// const getPakeeplLabels = ;
// const getGlobalLabels = ;

export const getFilteredLabels = createArraySelector(
  [(labels: any) => labels, (__: never, { app: { labels } }: RootStoreType) => labels],
  (pakeepId, globalLabels) => _.find(globalLabels, ({ id }) => id === pakeepId)
);

export const getCurrentFolderPropertyIdx = createSelector(
  [(state: RootStoreType) => state.app.currentFolderPropertyIdx],
  currentFolderPropertyIdx => currentFolderPropertyIdx
);

export const getFolders = createSelector([({ app }: RootStoreType) => app.folders], folders => folders);

export const getMenuOpenStatus = createSelector([({ app }: RootStoreType) => app.isMenuOpen], isMenuOpen => isMenuOpen);
export const getDrawerWidth = createSelector([({ app }: RootStoreType) => app.drawerWidth], drawerWidth => drawerWidth);
export const getLabels = createSelector([({ app }: RootStoreType) => app.labels], labels => labels);

export const getDefaultFolderArr = createSelector(
  [({ app }: RootStoreType) => app.defaultFolderArr],
  defaultFolderArr => defaultFolderArr
);

export const getPakeeps = createSelector([({ app }: RootStoreType) => app.pakeeps], pakeeps => pakeeps);
export const getPakeepsOrderNames = createSelector(
  [({ app }: RootStoreType) => app.pakeepsOrderNames],
  orderNames => orderNames
);

export const getPinnedPakeepsOrderNames = createSelector(
  [({ app }: RootStoreType) => app.pinnedPakeepsOrderNames],
  pinnedPakeepsOrderNames => pinnedPakeepsOrderNames
);

export const getSelectedPakeepsId = createSelector(
  [({ app }: RootStoreType) => app.selectedPakeepsId],
  selectedPakeepsId => selectedPakeepsId
);

export const getIsCancelSelectedPakeepsId = createSelector(
  [({ app }: RootStoreType) => app.isCancelSelectedPakeepsId],
  status => status
);

export const getSelectedPakeep = createArraySelector(
  [({ app }: RootStoreType) => app.selectedPakeepsId, (__: never, { app: { pakeeps } }: RootStoreType) => pakeeps],
  (selectedPakeepsId, pakeeps) => _.find(pakeeps, ({ id }) => id === selectedPakeepsId)
);

export const getGlobalEventsArr = createSelector(
  [({ app }: RootStoreType) => app.events],
  globalEvents => globalEvents
);
