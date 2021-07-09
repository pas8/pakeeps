import { TypeNames } from './enums';
import { AppActionTypes, PayloadTypes } from './types';

export const toChangeGlobalLabelListTemproparyData = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_LIST_TEMPROPARY_DATA]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_LIST_TEMPROPARY_DATA,
  payload
});
export const toChangeGlobalEventListTemproparyData = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_LIST_TEMPROPARY_DATA]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_LIST_TEMPROPARY_DATA,
  payload
});

export const toAddNewPakeep = (payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP]): AppActionTypes => ({
  type: TypeNames.HANDLE_ADD_NEW_PAKEEP,
  payload
});

export const toDeletePakeep = (payload: PayloadTypes[TypeNames.HANDLE_DELETE_PAKEEP]): AppActionTypes => ({
  type: TypeNames.HANDLE_DELETE_PAKEEP,
  payload
});

export const toEditPakeep = (payload: PayloadTypes[TypeNames.HANDLE_EDIT_PAKEEP]): AppActionTypes => ({
  type: TypeNames.HANDLE_EDIT_PAKEEP,
  payload
});

export const toDeleteGlobalLabel = (payload: PayloadTypes[TypeNames.HANDLE_DELETE_GLOBAL_LABEL]): AppActionTypes => ({
  type: TypeNames.HANDLE_DELETE_GLOBAL_LABEL,
  payload
});

export const toAddEventToPakeep = (payload: PayloadTypes[TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP]): AppActionTypes => ({
  type: TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP,
  payload
});

export const toChangeHeaderHeigth = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_HEADER_HEIGTH]): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_HEADER_HEIGTH,
  payload
});

export const toChangePakeeps = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEPS]): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_PAKEEPS,
  payload
});

export const toChangeUserData = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_USER_DATA]): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_USER_DATA,
  payload
});

export const toChangeMenuOpenStatus = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS,
  payload
});

export const toSetCurrentFolderPropertyIdx = (
  payload: PayloadTypes[TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX]
): AppActionTypes => ({
  type: TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX,
  payload
});

export const toChangeAvatarProperties = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES,
  payload
});

export const toChangeFolders = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_FOLDERS]): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_FOLDERS,
  payload
});

export const toChangeGlobalLabels = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABELS]): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_GLOBAL_LABELS,
  payload
});

export const toChangeGlobalLabelItem = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_ITEM]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_ITEM,
  payload
});

export const toDeleteLabelFromPakeep = (
  payload: PayloadTypes[TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP]
): AppActionTypes => ({
  type: TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP,
  payload
});

export const toSetDrawerWidth = (payload: PayloadTypes[TypeNames.HANDLE_SET_DRAWER_WIDTH]): AppActionTypes => ({
  type: TypeNames.HANDLE_SET_DRAWER_WIDTH,
  payload
});

export const toChangeTemporaryData = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_TEMPORARY_DATA]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_TEMPORARY_DATA,
  payload
});

export const toAddGlobalEvent = (payload: PayloadTypes[TypeNames.HANDLE_ADD_GLOBAL_EVENT]): AppActionTypes => ({
  type: TypeNames.HANDLE_ADD_GLOBAL_EVENT,
  payload
});

export const toAddNewGlobalLabel = (payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL]): AppActionTypes => ({
  type: TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL,
  payload
});

export const toChangePinStatusOfPakeeps = (
  payload: PayloadTypes[TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS]
): AppActionTypes => ({
  type: TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS,
  payload
});

export const toSetOrderNamesOfPinnedPakeeps = (
  payload: PayloadTypes[TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS]
): AppActionTypes => ({
  type: TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS,
  payload
});
export const toSetOrderNamesOfPakeeps = (payload: PayloadTypes[TypeNames.HANDLE_SET_ORDER_NAMES]): AppActionTypes => ({
  type: TypeNames.HANDLE_SET_ORDER_NAMES,
  payload
});

export const toSetSelectedPakeepIdsArr = (
  payload: PayloadTypes[TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR]
): AppActionTypes => ({
  type: TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR,
  payload
});

export const toCancelSelectingStatus = (
  payload: PayloadTypes[TypeNames.HANDLE_CANCEL_SELECTING_STATUS]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CANCEL_SELECTING_STATUS,
  payload
});

export const toChangeSelectedPakeepsProperty = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY,
  payload
});

export const toAddLabelToPakeep = (payload: PayloadTypes[TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP]): AppActionTypes => ({
  type: TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP,
  payload
});

export const toChangePakeepProperty = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY,
  payload
});
export const toChangePakeepCustomProperty = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY]
): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY,
  payload
});


export const toChangeThemeColors = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS]): AppActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_THEME_COLORS,
  payload
});

