import { SelectedPakeepsIdType, SelectedPakeepsType } from 'models/types';
import { $Keys, $Values, Brand } from 'utility-types';
import { TypeNames } from './enums';

export type PayloadTypes = {
  [TypeNames.HANDLE_ADD_NEW_PAKEEP]: {
    newPakeep: PakeepElementInterface;
  };
  [TypeNames.HANDLE_DELETE_PAKEEP]: { pakeepId: string };
  [TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP]: { newEvent: PakeepEventInteface; pakeepId: PakeepIdType };
  [TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS]: { isMenuOpen: boolean };
  [TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX]: { currentFolderPropertyIdx: number };
  [TypeNames.HANDLE_SET_NEW_ORDER_NAMES]: { newOrderNames: OrderNamesType };
  [TypeNames.HANDLE_CHANGE_FOLDERS]: { folders: FoldersType };
  [TypeNames.HANDLE_CHANGE_GLOBAL_LABELS]: { labels: GlobalLabelsType };
  [TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP]: {
    currentPakeepId: PakeepIdType;
    labelIdWhichShouldBeDeleted: LabelIdType;
  };
  [TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP]: {
    currentPakeepId: PakeepIdType;
    labelIdWhichShouldBeAdded: LabelIdType;
  };
  [TypeNames.HANDLE_SET_DRAWER_WIDTH]: { drawerWidth: DrawerWidthType };
  [TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL]: { newLabel: LabelElementInterface };
  [TypeNames.HANDLE_CHANGE_PAKEEPS]: { pakeeps: PakeepsType };
  [TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS]: { pakeepId: PakeepIdType; isPakeepPinned?: boolean };
  [TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS]: { pinnedPakeepsOrderNames: OrderNamesType };
  [TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR]: { selectedPakeepsId: SelectedPakeepsIdType };
  [TypeNames.HANDLE_CANCEL_SELECTING_STATUS]: { isCancelSelectedPakeepsId: boolean };
  [TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY]: { newPakeeps: PakeepsType };
  [TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY]: {
    pakeepId: PakeepIdType;
    property: PakeepPropertyType;
  };
  [TypeNames.HANDLE_CHANGE_THEME_COLORS]: { newThemeColors: DefaultThemeInterface };
};

export type ActionsValueTypes = {
  ToAddNewPakep: {
    type: typeof TypeNames.HANDLE_ADD_NEW_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP];
  };

  ToDeletePakeep: {
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
    type: typeof TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP];
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
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS];
  };
};
export type AppActionTypes = $Values<ActionsValueTypes>;

export type useHooksTypes = {
  [TypeNames.HANDLE_ADD_NEW_PAKEEP]: {
    pinnedPakeepsOrderNames: OrderNamesType;
    pakeepsOrderNames: OrderNamesType;
    pakeeps: PakeepsType;
  };
  [TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP]: {
    pakeepId: PakeepIdType;
    properyName: PakeepPropertyKeysType;
    propertyValue: any;
    pakeeps: PakeepsType;
  };
  [TypeNames.HANDLE_DELETE_PAKEEP]: {
    pakeepId: PakeepIdType;
    pakeeps: PakeepsType;
  };
};
export type OnlyPakeepReturnType = { pakeeps: PakeepsType };
// export type ActionWithOnlyPayloadType<T> = (payload: T) => AppActionTypes;

type ColorType = 'default' | string;
export type LabelVariantType = 'default' | 'outlined';
export type IconNameType = string;
export type TitleType = string;

export type FoldersType = any[][];

export interface GlobalEventInteface {
  title: TitleType;
  iconName: IconNameType;
  id: string;
  value: number | Date;
  onlyTime?: boolean;
  color: string;
}

export interface DefaultFolderElementInterface {
  title: TitleType;
  iconName: string;
  id: string;
  property: string;
}

export interface PakeepEventInteface {
  id: string;
  value: number | Date;
}

// export type PakeepIdType = Brand<string, '_pakeepId'>;
export type PakeepIdType = string;

export interface PakeepElementInterface {
  title: TitleType;
  text: string;
  isInBookmark: boolean;
  isFavorite: boolean;
  color: ColorType;
  labels: string[];
  isArchived: boolean;
  events: GlobalEventInteface[];
  readonly id: PakeepIdType;
  isPinned: boolean;
  isCheckBoxes: boolean;
  backgroundColor: ColorType;
}

export type LabelIdType = string;

export interface LabelElementInterface {
  color: ColorType;
  title: string;
  iconName: IconNameType;
  id: LabelIdType;
  variant: LabelVariantType;
}
export type GlobalLabelsType = LabelElementInterface[];
export type GlobalEventsType = GlobalEventInteface[];

export interface DefaultThemeInterface {
  primaryMain?: string;
  paperMain?: string;
  defaultBackgroundMain?: string;
  secondaryMain?: string;
  type: 'dark' | 'light';
  highEmphasis?: string;
  mediumEmphasis?: string;
  maxEmphasis?: string;
}
export type OrderNameType = string;
export type OrderNamesType = OrderNameType[];
export type DrawerWidthType = number;
export type PakeepsType = PakeepElementInterface[];

export interface AppInitialStateInteface {
  // breakpointsValues: BreakpointsValuesInterface<number>;
  // theme: DefaultThemeInterface;
  defaultFolderArr: DefaultFolderElementInterface[];
  labels: GlobalLabelsType;
  events: GlobalEventsType;
  selectedPakeepsId: SelectedPakeepsIdType;
  folders: FoldersType;
  pakeeps: PakeepsType;
  pakeepsOrderNames: OrderNamesType;
  pinnedPakeepsOrderNames: OrderNamesType;
  notifinationCounter: number;
  isMenuOpen: boolean;
  currentFolderPropertyIdx: number;
  drawerWidth: DrawerWidthType;
  isCancelSelectedPakeepsId: boolean;
}

export type PakeepPropertyValueType = $Values<PakeepElementInterface>;
export type PakeepPropertyKeysType = $Keys<PakeepElementInterface>;

export type PakeepPropertyType = { [key: string]: PakeepElementInterface };

export type OperateWOP<N> = (payload: N) => void;
