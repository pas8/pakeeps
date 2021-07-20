import { ILabelElement } from './types';
import { RootStoreType } from 'models/types';
import { find } from 'lodash';
import { createSelector } from 'reselect';
import { createArraySelector } from 'reselect-map';
import { DefaultFirebaseStateType } from '../Auth/operations';

// const getPakeeplLabels = ;
// const getGlobalLabels = ;

// export const getFilteredLabels = createArraySelector(
//   [(labels: any) => labels, ({ app: { labels } }: RootStoreType) => labels],
//   (pakeepId, globalLabels) => _.find(globalLabels, ({ id }) => id === pakeepId)
// );

export const getFilteredLabels = (h: any) => h;

export const getGlobalFolderId = createSelector(
  [(state: RootStoreType) => state.app.temporaryData.globalFolderId],
  globalFolderId => globalFolderId
);
export const getAdditionalMenuState = createSelector(
  [(state: RootStoreType) => state.app.temporaryData.additionalMenuState],
  additionalMenuState => additionalMenuState
);

export const getFolderDimensions = createSelector(
  [(state: RootStoreType) => state.app.dimensions.folder],
  folderDimensions => folderDimensions
);

export const getPakeepDimensions = createSelector(
  [(state: RootStoreType) => state.app.dimensions.pakeep],
  pakeepDimensions => pakeepDimensions
);

export const getMenuOpenStatus = createSelector(
  [({ app }: RootStoreType) => app.temporaryData.menuOpenStatus],
  menuOpenStatus => menuOpenStatus
);
export const getDrawerWidth = createSelector(
  [({ app }: RootStoreType) => app.temporaryData.drawerWidth],
  drawerWidth => drawerWidth
);
export const getLabels = createSelector([({ app }: RootStoreType) => app.labels], labels => labels);

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
  [({ app }: RootStoreType) => app.temporaryData.selectedPakeepsId],
  selectedPakeepsId => selectedPakeepsId
);

export const getIsCancelSelectedPakeepsId = createSelector(
  [({ app }: RootStoreType) => app.temporaryData.isCancelSelectedPakeepsId],
  status => status
);

export const getSelectedPakeeps = createArraySelector(
  [({ app }: RootStoreType) => app.temporaryData.selectedPakeepsId, ({ app: { pakeeps } }: RootStoreType) => pakeeps],
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
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.isAllDataWasUploaded],
  isAllDataWasUploaded => isAllDataWasUploaded
);

export const getHeaderHeight = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.headerHeight],
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
export const getSearchPropertyies = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.searchPropertyies],
  searchPropertyies => searchPropertyies
);
export const getQuerySearchArr = createSelector(
  [({ app: { querySearchArr } }: RootStoreType) => querySearchArr],
  querySearchArr => querySearchArr
);


export const getUserData = createSelector([({ app: { userData } }: RootStoreType) => userData], userData => userData);

export const getNotificationArr = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.notifinationArr],
  notifinationArr => notifinationArr
);

export const getMenuAccountUtilsArr = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.menuAccountUtilsArr],
  menuAccountUtilsArr => menuAccountUtilsArr
);
export const getIsUseEditingDialogAsNewPakeep = createSelector(
  [({ app: { temporaryData } }: RootStoreType) => temporaryData.isUseEditingDialogAsNewPakeep],
  isUseEditingDialogAsNewPakeep => isUseEditingDialogAsNewPakeep
);

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

export const getPakeepFolderOrderNames = createSelector(
  [({ app: { folderOrderNames } }: RootStoreType) => folderOrderNames],
  folderOrderNames => folderOrderNames
);

export const getNotifinationCounterValue = createSelector(
  [
    ({
      app: {
        temporaryData: { notifinationArr }
      }
    }: RootStoreType) => notifinationArr.length
  ],
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

export const getAllFirebaseData = createSelector(
  [
    ({ app: { temporaryData, ...appData }, color, settings }: RootStoreType) => ({
      app: { ...appData },
      color,
      settings
    })
  ],
  allFirebaseData => allFirebaseData
);
