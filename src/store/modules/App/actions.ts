import { AppActionTypes, PayloadTypes, TypesNames } from './types';

export const toAddNewPakeep = (payload: PayloadTypes[TypesNames.HANDLE_ADD_NEW_PAKEEP]): AppActionTypes => ({
  type: TypesNames.HANDLE_ADD_NEW_PAKEEP,
  payload
});
export const toDeletePakeep = (payload: PayloadTypes[TypesNames.HANDLE_DELETE_PAKEEP]): AppActionTypes => ({
  type: TypesNames.HANDLE_DELETE_PAKEEP,
  payload
});

export const toAddEventToPakeep = (payload: PayloadTypes[TypesNames.HANDLE_ADD_EVENT_TO_PAKEEP]): AppActionTypes => ({
  type: TypesNames.HANDLE_ADD_EVENT_TO_PAKEEP,
  payload
});

export const toChangeMenuOpenStatus = (
  payload: PayloadTypes[TypesNames.HANDLE_CHANGE_MENU_OPEN_STATUS]
): AppActionTypes => ({
  type: TypesNames.HANDLE_CHANGE_MENU_OPEN_STATUS,
  payload
});

export const toSetCurrentFolderPropertyIdx = (
  payload: PayloadTypes[TypesNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX]
): AppActionTypes => ({
  type: TypesNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX,
  payload
});

// export const toAddDateToPakeep = (pakeepId, event) => ({ type: types.ADD_DATE_TO_PAKEEP, pakeepId, event });

// export const toScroll = scrollDirectionName => ({ type: types.SCROLL_DIRECTION, scrollDirectionName });

// export const toSetNewOrderNames = newOrder => ({ type: types.SET_NEW_ORDER_NAMES, newOrder });
// export const toSetCurrentFolderPropertyIdx = folderIdx => ({
//   type: types.HANDLE_CURRENT_FOLDER_PROPERTY_IDX,
//   folderIdx
// });

// export const toChangeFolders = foldersArr => ({ type: types.HANDLE_FOLDERS, foldersArr });
// export const toChangeLabelItem = labels => ({ type: types.CHANGE_LABEL_ITEM, labels });

// export const toChangeLabelFromPakeep = (currentPakeep, labels) => ({
//   type: types.HANDLE_CHANGE_LABEL_IN_PAKEEP,
//   currentPakeep,
//   labels
// });

// export const toSetPreviusOrderNames = orderNames => ({ type: types.HANDLE_SET_PREVIUOS_ORDER_NAMES, orderNames });
// export const toSetOrderNamesOfPinnedPakeeps = orderNames => ({
//   type: types.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS,
//   orderNames
// });
// export const toHandleDrawerWidth = drawerWidth => ({ type: types.HANDLE_DRAWER_WIDTH, drawerWidth });

// export const toAddNewGlobalLabel = newLabel => ({ type: types.ADD_NEW_GLOBAL_LABEL, newLabel });
// export const toSetNewPakeepsArr = pakeeps => ({ type: types.HANDLE_PAKEEPS, pakeeps });

// export const toHandlePinStatusPakeep = (pakeepId, isPakeepPinned) => ({
//   type: types.HANDLE_PIN_STATUS_OF_PAKEEPS,
//   pakeepId,
//   isPakeepPinned
// });

// export const toSetSelectedPakeepIds = pakepsId => ({ type: types.HANDLE_SET_SELECTED_PAKEEPIDS_ARR, pakepsId });
// export const toSetIsCancelSelectedPakeepsId = boolValue => ({ type: types.HANDLE_CANCEL_SELECTING_STATUS, boolValue });

// export const toHandleSelectedPakeepsProperty = (newPakeeps, propertyVariant) => ({
//   type: types.HANDLE_SELECTED_PAKEEPS_PROPERTY,
//   newPakeeps,
//   propertyVariant
// });

// export const toHandlePakeepProperty = (pakeepId, property) => ({
//   type: types.HANDLE_PAKEEP_PROPERTY,
//   pakeepId,
//   property
// });

// export const toHandleThemeColors = newThemeColors => ({
//   type: types.HANDLE_THEME_COLORS,
//   newThemeColors
// });
