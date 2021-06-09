import { OrderNameType, PakeepElementInterface, PakeepEventInteface } from './interfaces';

export enum TypesNames {
  HANDLE_ADD_EVENT_TO_PAKEEP = 'HANDLE_ADD_EVENT_TO_PAKEEP',
  HANDLE_ADD_NEW_PAKEEP = 'HANDLE_ADD_NEW_PAKEP',
  HANDLE_CHANGE_MENU_OPEN_STATUS = 'HANDLE_CHANGE_MENU_OPEN_STATUS',
  HANDLE_DELETE_PAKEEP = 'DELETE_PAKEEP',
  HANDLE_SET_NEW_ORDER_NAMES = 'SET_NEW_ORDER_NAMES',
  HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX = 'HANDLE_CURRENT_FOLDER_PROPERTY_IDX',
  HANDLE_FOLDERS = 'HANDLE_FOLDERS',
  HANDLE_CHANGE_LABEL_ITEM = 'CHANGE_LABEL_ITEM',
  HANDLE_UNARCHIVETE_PAKEEP = 'UNARCHIVETE_PAKEEP',
  HANDLE_CHANGE_LABEL_IN_PAKEEP = 'HANDLE_CHANGE_LABEL_IN_PAKEEP',
  HANDLE_SET_PREVIUOS_ORDER_NAMES = 'HANDLE_SET_PREVIUOS_ORDER_NAMES',
  HANDLE_DRAWER_WIDTH = 'HANDLE_DRAWER_WIDTH',
  HANDLE_ADD_NEW_GLOBAL_LABEL = 'HANDLE_ADD_NEW_GLOBAL_LABEL',
  HANDLE_PAKEEPS = 'HANDLE_PAKEEPS',
  HANDLE_PIN_STATUS_OF_PAKEEPS = 'HANDLE_PIN_STATUS_OF_PAKEEPS',
  HANDLE_UNPIN_PAKEEPS = 'HANDLE_UNPIN_PAKEEPS',
  HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS = 'HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS',
  HANDLE_SET_SELECTED_PAKEEPIDS_ARR = 'HANDLE_SET_SELECTED_PAKEEPIDS_ARR',
  HANDLE_CANCEL_SELECTING_STATUS = 'HANDLE_CANCEL_SELECTING_STATUS',
  HANDLE_SELECTED_PAKEEPS_PROPERTY = 'HANDLE_SELECTED_PAKEEPS_PROPERTY',
  HANDLE_ADD_LABEL_TO_PAKEEP = 'ADD_LABEL_TO_PAKEEP',
  HANDLE_PAKEEP_PROPERTY = 'HANDLE_PAKEEP_PROPERTY',
  HANDLE_THEME_COLORS = 'HANDLE_THEME_COLORS'
}

export type PayloadTypes = {
  [TypesNames.HANDLE_ADD_NEW_PAKEEP]: { newPakeep: PakeepElementInterface };
  [TypesNames.HANDLE_DELETE_PAKEEP]: { pakeepId: string };
  [TypesNames.HANDLE_ADD_EVENT_TO_PAKEEP]: { newEvent: PakeepEventInteface };
  [TypesNames.HANDLE_CHANGE_MENU_OPEN_STATUS]: { menuOpenStatus: boolean };
};

type ToAddNewPakepType = {
  type: typeof TypesNames.HANDLE_ADD_NEW_PAKEEP;
  payload: PayloadTypes[TypesNames.HANDLE_ADD_NEW_PAKEEP];
};

type ToDeletePakeepType = {
  type: typeof TypesNames.HANDLE_DELETE_PAKEEP;
  payload: PayloadTypes[TypesNames.HANDLE_DELETE_PAKEEP];
};

type ToAddEventToPakeepType = {
  type: typeof TypesNames.HANDLE_ADD_EVENT_TO_PAKEEP;
  payload: PayloadTypes[TypesNames.HANDLE_ADD_EVENT_TO_PAKEEP];
};

type ToChangeMenuOpenStatusType = {
  type: typeof TypesNames.HANDLE_CHANGE_MENU_OPEN_STATUS;
  payload:   PayloadTypes[TypesNames.HANDLE_CHANGE_MENU_OPEN_STATUS];
};

type ToSetNewOrderNamesType = {
  type: typeof TypesNames.HANDLE_SET_NEW_ORDER_NAMES;
  payload: { newOrderNames: OrderNameType[] };
};
type ToSetCurrentFolderPropertyIdxType = {
  type: typeof TypesNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX;
  payload: { folderIdx: number };
};

export type AppActionTypes =
  | ToAddNewPakepType
  | ToAddEventToPakeepType
  | ToChangeMenuOpenStatusType
  | ToDeletePakeepType
  | ToSetNewOrderNamesType
  | ToSetCurrentFolderPropertyIdxType;

// export enum TypesNamevs {

// toFolders
// toChangeLabelItem
// toUnarchivetePakeep
// toChangeLabelInPakeep
// toSetPreviuosOrderNames
// toDrawerWidth
// toAddNewGlobalLabel
// toPakeeps
// toPinStatusOfPakeeps
// toUnpinPakeeps
// toSetOrderNamesOfPinnedPakeeps
// toSetSelectedPakeepidsArr
// toCancelSelectingStatus
// toSelectedPakeepsProperty
// toAddLabelToPakeep
// toPakeepProperty
// toThemeColors

// }
