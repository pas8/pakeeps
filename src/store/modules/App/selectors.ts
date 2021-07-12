import { ILabelElement } from './types';
import { RootStoreType } from 'models/types';
import { find } from 'lodash';
import { createSelector } from 'reselect';
import { createArraySelector } from 'reselect-map';

// const getPakeeplLabels = ;
// const getGlobalLabels = ;

// export const getFilteredLabels = createArraySelector(
//   [(labels: any) => labels, ({ app: { labels } }: RootStoreType) => labels],
//   (pakeepId, globalLabels) => _.find(globalLabels, ({ id }) => id === pakeepId)
// );

export const getFilteredLabels = (h: any) => h;

export const getCurrentFolderPropertyIdx = createSelector(
  [(state: RootStoreType) => state.app.currentFolderPropertyIdx],
  currentFolderPropertyIdx => currentFolderPropertyIdx
);

export const getFolders = createSelector([({ app }: RootStoreType) => app.folders], folders => folders);

export const getMenuOpenStatus = createSelector(
  [({ app }: RootStoreType) => app.menuOpenStatus],
  menuOpenStatus => menuOpenStatus
);
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

export const getSelectedPakeeps = createArraySelector(
  [({ app }: RootStoreType) => app.selectedPakeepsId, ({ app: { pakeeps } }: RootStoreType) => pakeeps],
  (selectedPakeepsId, pakeeps) => find(pakeeps, ({ id }) => id === selectedPakeepsId)!
);

export const getGlobalEventsArr = createSelector(
  [({ app }: RootStoreType) => app?.events],
  globalEvents => globalEvents
);

export const getDefaultMenuPropsOfTemporaryData = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.defaultMenuProps],
  defaultMenuProps => defaultMenuProps
);

export const getIsPakeepHovering = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.pakeep.isHovering],
  isHovering => isHovering
);

export const getIsAllDataWasUploaded = createSelector(
  [({ app: { isAllDataWasUploaded } }: RootStoreType) => isAllDataWasUploaded],
  isAllDataWasUploaded => isAllDataWasUploaded
);

export const getHeaderHeight = createSelector(
  [({ app: { headerHeight } }: RootStoreType) => headerHeight],
  headerHeight => headerHeight
);

export const gethLocalPasswordPropetyies = createSelector(
  [
    ({ app: { temporaryData, userData } }: RootStoreType) => ({
      isAuthedWithLocalPinCode: temporaryData.isAuthedWithLocalPinCode,
      value: userData.localPinCode
    })
  ],
  localPasswordPropetyies => localPasswordPropetyies
);

export const getIsAuthedWithLocalPassword = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.isAuthedWithLocalPinCode],
  isAuthedWithLocalPinCode => isAuthedWithLocalPinCode
);

export const getUserData = createSelector([({ app: { userData } }: RootStoreType) => userData], userData => userData);

export const getGlobalEventListTemproparyData = createSelector(
  [
    ({
      app: {
        temporaryData: { globalEventList }
      }
    }: RootStoreType) => globalEventList
  ],
  globalEventList => globalEventList
);

export const getGlobalLabelListTemproparyData = createSelector(
  [
    ({
      app: {
        temporaryData: { globalLabelList }
      }
    }: RootStoreType) => globalLabelList
  ],
  globalLabelList => globalLabelList
);

export const getAvatarProperties = createSelector(
  [({ app: { avatarProperties } }: RootStoreType) => avatarProperties],
  avatarProperties => avatarProperties
);

export const getNotifinationCounterValue = createSelector(
  [({ app: { notifinationCounter } }: RootStoreType) => notifinationCounter],
  notifinationCounter => notifinationCounter
);

export const getIsZenModeActive = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.isZenModeActive],
  isZenModeActive => isZenModeActive
);

export const getHeaderProperties = createSelector(
  [({ app: { headerPropertyies } }: RootStoreType) => headerPropertyies],
  headerPropertyies => headerPropertyies
);

export const getDefaultDialogPropsOfTemporaryData = createSelector(
  [
    ({
      app: {
        temporaryData: { defaultDialogProps }
      }
    }: RootStoreType) => defaultDialogProps
  ],
  defaultDialogProps => defaultDialogProps
);
