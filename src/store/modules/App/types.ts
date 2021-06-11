import { $Values } from 'utility-types';
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

type AppActionsValueType = {
  ToAddNewPakep: {
    type: typeof TypeNames.HANDLE_ADD_NEW_PAKEEP;
    payload: PayloadTypes[ typeof TypeNames.HANDLE_ADD_NEW_PAKEEP];
  };
  ToDeletePakeep: {
    type: typeof TypeNames.HANDLE_DELETE_PAKEEP;
    payload: PayloadTypes[ typeof TypeNames.HANDLE_DELETE_PAKEEP];
  };
  ToAddNewPakepType: {
    type: typeof TypeNames.HANDLE_ADD_NEW_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP];
  };

  ToDeletePakeepType: {
    type: typeof TypeNames.HANDLE_DELETE_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_DELETE_PAKEEP];
  };

  ToAddEventToPakeepType: {
    type: typeof TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP];
  };

  ToChangeMenuOpenStatusType: {
    type: typeof TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS];
  };
  ToSetNewOrderNamesType: {
    type: typeof TypeNames.HANDLE_SET_NEW_ORDER_NAMES;
    payload: PayloadTypes[TypeNames.HANDLE_SET_NEW_ORDER_NAMES];
  };
  ToSetCurrentFolderPropertyIdxType: {
    type: typeof TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX;
    payload: PayloadTypes[TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX];
  };

  ToChangeFolders: {
    type: typeof TypeNames.HANDLE_CHANGE_FOLDERS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_FOLDERS];
  };

  ToChangeGlobalLabels: {
    type: typeof TypeNames.HANDLE_CHANGE_GLOBAL_LABELS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABELS];
  };
  ToChangeLabelsInPakeep: {
    type: typeof TypeNames.HANDLE_CHANGE_LABELS_IN_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_LABELS_IN_PAKEEP];
  };

  ToSetDrawerWidth: {
    type: typeof TypeNames.HANDLE_SET_DRAWER_WIDTH;
    payload: PayloadTypes[TypeNames.HANDLE_SET_DRAWER_WIDTH];
  };

  ToAddNewGlobalLabel: {
    type: typeof TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL;
    payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL];
  };

  ToChangePakeeps: {
    type: typeof TypeNames.HANDLE_CHANGE_PAKEEPS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEPS];
  };

  ToPinStatusOfPakeeps: {
    type: typeof TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS;
    payload: PayloadTypes[TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS];
  };

  ToSetOrderNamesOfPinnedPakeeps: {
    type: typeof TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS;
    payload: PayloadTypes[TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS];
  };

  ToSetSelectedPakeepIdsArr: {
    type: typeof TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR;
    payload: PayloadTypes[TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR];
  };
  ToCancelSelectingStatus: {
    type: typeof TypeNames.HANDLE_CANCEL_SELECTING_STATUS;
    payload: PayloadTypes[TypeNames.HANDLE_CANCEL_SELECTING_STATUS];
  };

  ToChangeSelectedPakeepsProperty: {
    type: typeof TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY];
  };

  ToAddLabelToPakeep: {
    type: typeof TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP];
  };

  ToChangePakeepProperty: {
    type: typeof TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY];
  };

  ToChangeThemeColors: {
    type: typeof TypeNames.HANDLE_CHANGE_THEME_COLORS;
    payload: PayloadTypes[  TypeNames.HANDLE_CHANGE_THEME_COLORS];
  };
};

// export type ActionWithOnlyPayloadType<T> = (payload: T) => AppActionTypes;


export type AppActionTypes = $Values<AppActionsValueType>;