import { TypeNames } from './enums';
import {
  DefaultThemeInterface,
  DrawerWidthType,
  FoldersType,
  GlobalLabelsType,
  LabelElementInterface,
  OrderNamesType,
  PakeepElementInterface,
  PakeepEventInteface,
  PakeepIdType,
  PakeepPropertyType,
  PakeepPropertyValueType,
  PakeepsType,
  SelectedPakeepsIdType
} from './interfaces';

export type PayloadTypes = {
  [TypeNames.HANDLE_ADD_NEW_PAKEEP]: { newPakeep: PakeepElementInterface };
  [TypeNames.HANDLE_DELETE_PAKEEP]: { pakeepId: string };
  [TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP]: { newEvent: PakeepEventInteface; pakeepId: PakeepIdType };
  [TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS]: { menuOpenStatus: boolean };
  [TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX]: { folderIdx: number };
  [TypeNames.HANDLE_SET_NEW_ORDER_NAMES]: { newOrderNames: OrderNamesType };
  [TypeNames.HANDLE_CHANGE_FOLDERS]: { folders: FoldersType };
  [TypeNames.HANDLE_CHANGE_GLOBAL_LABELS]: { newGlobalLabels: GlobalLabelsType };
  [TypeNames.HANDLE_CHANGE_LABELS_IN_PAKEEP]: {
    currentPakeep: PakeepElementInterface;
    currentPakeepLabels: LabelElementInterface[];
  };
  [TypeNames.HANDLE_SET_DRAWER_WIDTH]: { drawerWidth: DrawerWidthType };
  [TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL]: { newLabel: LabelElementInterface };
  [TypeNames.HANDLE_CHANGE_PAKEEPS]: { pakeeps: PakeepElementInterface };
  [TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS]: { pakeepId: PakeepIdType; isPakeepPinned?: boolean };
  [TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS]: { pinnedPakeepsOrderNames: OrderNamesType };
  [TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR]: { selectedPakeepsId: SelectedPakeepsIdType };
  [TypeNames.HANDLE_CANCEL_SELECTING_STATUS]: { boolStatus: boolean };
  [TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY]: { newPakeeps: PakeepsType };
  [TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP]: { newPakeep: PakeepElementInterface };
  [TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY]: {
    pakeepId: PakeepIdType;
    property: PakeepPropertyType;
  };
  [TypeNames.HANDLE_CHANGE_THEME_COLORS]: { newThemeColors: DefaultThemeInterface };
};

type ToAddNewPakepType = {
  type: typeof TypeNames.HANDLE_ADD_NEW_PAKEEP;
  payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP];
};

type ToDeletePakeepType = {
  type: typeof TypeNames.HANDLE_DELETE_PAKEEP;
  payload: PayloadTypes[TypeNames.HANDLE_DELETE_PAKEEP];
};

type ToAddEventToPakeepType = {
  type: typeof TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP;
  payload: PayloadTypes[TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP];
};

type ToChangeMenuOpenStatusType = {
  type: typeof TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS];
};

type ToSetNewOrderNamesType = {
  type: typeof TypeNames.HANDLE_SET_NEW_ORDER_NAMES;
  payload: PayloadTypes[TypeNames.HANDLE_SET_NEW_ORDER_NAMES];
};
type ToSetCurrentFolderPropertyIdxType = {
  type: typeof TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX;
  payload: PayloadTypes[TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX];
};

type ToChangeFolders = {
  type: typeof TypeNames.HANDLE_CHANGE_FOLDERS;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_FOLDERS];
};

type ToChangeGlobalLabels = {
  type: typeof TypeNames.HANDLE_CHANGE_GLOBAL_LABELS;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABELS];
};
type ToChangeLabelsInPakeep = {
  type: typeof TypeNames.HANDLE_CHANGE_LABELS_IN_PAKEEP;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_LABELS_IN_PAKEEP];
};

type ToSetDrawerWidth = {
  type: typeof TypeNames.HANDLE_SET_DRAWER_WIDTH;
  payload: PayloadTypes[TypeNames.HANDLE_SET_DRAWER_WIDTH];
};

type ToAddNewGlobalLabel = {
  type: typeof TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL;
  payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL];
};

type ToChangePakeeps = {
  type: typeof TypeNames.HANDLE_CHANGE_PAKEEPS;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEPS];
};

type ToPinStatusOfPakeeps = {
  type: typeof TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS;
  payload: PayloadTypes[TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS];
};

type ToSetOrderNamesOfPinnedPakeeps = {
  type: typeof TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS;
  payload: PayloadTypes[TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS];
};

type ToSetSelectedPakeepIdsArr = {
  type: typeof TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR;
  payload: PayloadTypes[TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR];
};
type ToCancelSelectingStatus = {
  type: typeof TypeNames.HANDLE_CANCEL_SELECTING_STATUS;
  payload: PayloadTypes[TypeNames.HANDLE_CANCEL_SELECTING_STATUS];
};

type ToChangeSelectedPakeepsProperty = {
  type: typeof TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY];
};

type ToAddLabelToPakeep = {
  type: typeof TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP;
  payload: PayloadTypes[TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP];
};

type ToChangePakeepProperty = {
  type: typeof TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY];
};

type ToChangeThemeColors = {
  type: typeof TypeNames.HANDLE_CHANGE_THEME_COLORS;
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS];
};

export type AppActionTypes =
  | ToAddNewPakepType
  | ToAddEventToPakeepType
  | ToChangeSelectedPakeepsProperty
  | ToCancelSelectingStatus
  | ToAddLabelToPakeep
  | ToChangeMenuOpenStatusType
  | ToChangePakeepProperty
  | ToChangeThemeColors
  | ToSetSelectedPakeepIdsArr
  | ToDeletePakeepType
  | ToSetNewOrderNamesType
  | ToSetOrderNamesOfPinnedPakeeps
  | ToChangePakeeps
  | ToPinStatusOfPakeeps
  | ToSetCurrentFolderPropertyIdxType
  | ToChangeFolders
  | ToAddNewGlobalLabel
  | ToChangeLabelsInPakeep
  | ToSetDrawerWidth
  | ToChangeGlobalLabels;
