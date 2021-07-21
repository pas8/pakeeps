import {
  pakeepPropertyiesNames,
  NONE,
  menuOpenStatusDenotation,
  allPakeeepsSearchPropertyies,
  headerProfileUtilsDenotationIds
} from 'models/denotation';
import {
  CustomColorType,
  FolderDimensionsType,
  SelectedPakeepsIdType,
  SelectedPakeepsType,
  UseStylesCustomColorType
} from 'models/types';
import { $Keys, $Values, Brand, Optional } from 'utility-types';
import { TypeNames } from './enums';
import { AdditionalFolderPropertyNames, DialogLayoutName, MenusLayoutName } from 'models/unums';
import { HeaderMenuArrItemType } from 'components/Header/types';

export type PayloadTypes = {
  [TypeNames.HANDLE_ADD_NEW_PAKEEP]: {
    newPakeep: PakeepElementType;
  };
  [TypeNames.HANDLE_DELETE_PAKEEP]: { pakeepId: string };
  [TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP]: { newEvent: PakeepEventInteface; pakeepId: PakeepIdType };
  [TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS]: { menuOpenStatus: IsMenuOpenType };
  [TypeNames.HANDLE_CHANGE_GLOBAL_FOLDER_ID]: { globalFolderId: GlobalFolderIdType };
  [TypeNames.HANDLE_SET_NEW_ORDER_NAMES]: { newOrderNames: OrderNamesType };
  [TypeNames.HANDLE_CHANGE_FOLDERS]: { folders: FoldersType };
  [TypeNames.HANDLE_CHANGE_GLOBAL_LABELS]: { labels: GlobalLabelsType };
  [TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_ITEM]: { changedLabel: ILabelElement };
  [TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_ITEM]: { changedEvent: IGlobalEvent };

  [TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP]: {
    currentPakeepId: PakeepIdType;
    labelIdWhichShouldBeDeleted: LabelIdType;
  };
  [TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP]: {
    currentPakeepId: PakeepIdType;
    labelIdWhichShouldBeAdded: LabelIdType;
  };

  [TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES]: {
    avatarProperties: AvatarPropertiesType;
  };
  [TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES]: {
    avatarProperties: AvatarPropertiesType;
  };
  [TypeNames.HANDLE_CHANGE_HEADER_HEIGTH]: {
    headerHeight: number;
  };

  [TypeNames.HANDLE_SET_DRAWER_WIDTH]: { drawerWidth: DrawerWidthType };
  [TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL]: { newLabel: ILabelElement };
  [TypeNames.HANDLE_CHANGE_PAKEEPS]: { pakeeps: PakeepsType };
  [TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS]: { pakeepId: PakeepIdType; isPakeepPinned?: boolean };
  [TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS]: { pinnedPakeepsOrderNames: OrderNamesType };
  [TypeNames.HANDLE_SET_ORDER_NAMES]: { pakeepsOrderNames: OrderNamesType };
  [TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR]: { selectedPakeepsId: SelectedPakeepsIdType };
  [TypeNames.HANDLE_CANCEL_SELECTING_STATUS]: { isCancelSelectedPakeepsId: boolean };
  [TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY]: { newPakeeps: PakeepsType };
  [TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY]: {
    pakeepId: PakeepIdType;
    property: PakeepPropertyType;
  };
  [TypeNames.HANDLE_CHANGE_THEME_COLORS]: { newThemeColors: DefaultThemeInterface };

  [TypeNames.HANDLE_CHANGE_TEMPORARY_DATA]: { newTemporaryData: Optional<TemporaryDatatype> };

  [TypeNames.HANDLE_CHANGE_USER_DATA]: { userData: Optional<UserDataType> };

  [TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_LIST_TEMPROPARY_DATA]: { globalLabelList: LabelsOfPakeepType };
  [TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_LIST_TEMPROPARY_DATA]: { globalEventList: EventsOfPakeepType };

  [TypeNames.HANDLE_ADD_GLOBAL_EVENT]: { newEvent: IGlobalEvent };
  [TypeNames.HANDLE_DELETE_GLOBAL_LABEL]: { labelId: LabelIdType };
  [TypeNames.HANDLE_EDIT_PAKEEP]: { editedPakeep: PakeepElementType };
  [TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY]: {
    propertyName: DefaultFolderElementPropertyNamesType;
    pakeepId: PakeepIdType;
  };

  [TypeNames.HANDLE_DELETE_GLOBAL_EVENT]: {
    eventId: EventIdType;
  };
  [TypeNames.HANDLE_CHANGE_ALL_DATA_WAS_UPLOADED_STATUS]: {
    isAllDataWasUploaded: boolean;
  };

  [TypeNames.HANDLE_CHANGE_FOLDER_ORDER_NAMES]: {
    folderOrderNames: FolderOrderNamesType;
  };
  [TypeNames.HANDLE_CHANGE_HEADER_ORDER]: {
    newOrder: Optional<OrderOfHeaderUtilsType>;
  };
  [TypeNames.HANDLE_CHANGE_ALL_FIREBASE_APP_STATE]: {
    firebaseState: InitialiAppFirebaseData;
  };
  [TypeNames.HANDLE_CHANGE_QUERY_SEARCH_ARR]: {
    querySearchArr: string[];
  };

  [TypeNames.HANDLE_CHANGE_ORDER_OF_ONLY_ONE_PAKEEP_COLUMN]: {
    orderOfOnlyOnePakeepColumn: OrderOfOnlyOnePakeepColumnType;
  };
  [TypeNames.HANDLE_CHANGE_DEFAULT_LAYOUT_MENU_PROPS]: {
    props: (DefaultMenuPropsType & { isShouldBeClosed?: false }) | { name: MenusLayoutName; isShouldBeClosed: true };
  };
  [TypeNames.HANDLE_CHANGE_DEFAULT_LAYOUT_DIALOG_PROPS]: {
    props: (DefaultDialogPropsType & { isShouldBeClosed?: false }) | { name: DialogLayoutName; isShouldBeClosed: true };
  };
};

export type ActionsValueTypes = {
  toChangeDefaultLayoutMenuProps: {
    type: typeof TypeNames.HANDLE_CHANGE_DEFAULT_LAYOUT_MENU_PROPS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_DEFAULT_LAYOUT_MENU_PROPS];
  };
  toChangeDefaultLayoutDialogProps: {
    type: typeof TypeNames.HANDLE_CHANGE_DEFAULT_LAYOUT_DIALOG_PROPS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_DEFAULT_LAYOUT_DIALOG_PROPS];
  };

  toChangeQuerySearchArr: {
    type: typeof TypeNames.HANDLE_CHANGE_QUERY_SEARCH_ARR;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_QUERY_SEARCH_ARR];
  };
  toChangeAllFirebaseAppState: {
    type: typeof TypeNames.HANDLE_CHANGE_ALL_FIREBASE_APP_STATE;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ALL_FIREBASE_APP_STATE];
  };

  toChangeHeaderOrder: {
    type: typeof TypeNames.HANDLE_CHANGE_HEADER_ORDER;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_HEADER_ORDER];
  };
  toChangeFolderOrderNames: {
    type: typeof TypeNames.HANDLE_CHANGE_FOLDER_ORDER_NAMES;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_FOLDER_ORDER_NAMES];
  };
  toChangeGlobalEventItem: {
    type: typeof TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_ITEM;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_ITEM];
  };
  toDeleteGlobalEvent: {
    type: typeof TypeNames.HANDLE_DELETE_GLOBAL_EVENT;
    payload: PayloadTypes[TypeNames.HANDLE_DELETE_GLOBAL_EVENT];
  };
  toEditPakeep: {
    type: typeof TypeNames.HANDLE_EDIT_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_EDIT_PAKEEP];
  };
  toDeleteGlobalLabel: {
    type: typeof TypeNames.HANDLE_DELETE_GLOBAL_LABEL;
    payload: PayloadTypes[TypeNames.HANDLE_DELETE_GLOBAL_LABEL];
  };
  toAddGlobalEvent: {
    type: typeof TypeNames.HANDLE_ADD_GLOBAL_EVENT;
    payload: PayloadTypes[TypeNames.HANDLE_ADD_GLOBAL_EVENT];
  };
  toChangeUserData: {
    type: typeof TypeNames.HANDLE_CHANGE_USER_DATA;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_USER_DATA];
  };
  toChangeHeaderHeigth: {
    type: typeof TypeNames.HANDLE_CHANGE_HEADER_HEIGTH;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_HEADER_HEIGTH];
  };
  toChangeAvatarProperties: {
    type: typeof TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES];
  };
  toChangeTemporaryData: {
    type: typeof TypeNames.HANDLE_CHANGE_TEMPORARY_DATA;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_TEMPORARY_DATA];
  };

  ToAddNewPakep: {
    type: typeof TypeNames.HANDLE_ADD_NEW_PAKEEP;
    payload: PayloadTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP];
  };
  toChangeGlobalLabelItem: {
    type: typeof TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_ITEM;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_ITEM];
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
    type: typeof TypeNames.HANDLE_CHANGE_GLOBAL_FOLDER_ID;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_FOLDER_ID];
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
  ToSetOrderNames: {
    type: typeof TypeNames.HANDLE_SET_ORDER_NAMES;
    payload: PayloadTypes[TypeNames.HANDLE_SET_ORDER_NAMES];
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

  ToChangeGlobalLabelListTemproparyData: {
    type: typeof TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_LIST_TEMPROPARY_DATA;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_LIST_TEMPROPARY_DATA];
  };

  toChangeGlobalEventListTemproparyData: {
    type: typeof TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_LIST_TEMPROPARY_DATA;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_LIST_TEMPROPARY_DATA];
  };

  ToChangeThemeColors: {
    type: typeof TypeNames.HANDLE_CHANGE_THEME_COLORS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS];
  };
  toChangePakeepCustomProperty: {
    type: typeof TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY];
  };
  toChangeAllDataWasUploadedStatus: {
    type: typeof TypeNames.HANDLE_CHANGE_ALL_DATA_WAS_UPLOADED_STATUS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ALL_DATA_WAS_UPLOADED_STATUS];
  };

  toChangeOrderOfOnlyOnePakeepColumn: {
    type: typeof TypeNames.HANDLE_CHANGE_ORDER_OF_ONLY_ONE_PAKEEP_COLUMN;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ORDER_OF_ONLY_ONE_PAKEEP_COLUMN];
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
    propertyValue?: any;
    pakeeps: PakeepsType;
  };

  [TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY]: {
    pakeepId: PakeepIdType;
    pakeeps: PakeepsType;
    property: PakeepPropertyType;
  };
  [TypeNames.HANDLE_DELETE_PAKEEP]: {
    pakeepId: PakeepIdType;
    pakeeps: PakeepsType;
  };
};
export type OnlyPakeepReturnType = { pakeeps: PakeepsType };
// export type ActionWithOnlyPayloadType<T> = (payload: T) => AppActionTypes;
export type PakeepPropertyType = Optional<PakeepElementType>;
export type ColorType = 'default' | string;
export type LabelVariantType = 'default' | 'outlined';
export type IconNameType = string;
export type TitleType = string;

export type FolderAdditionalArrPropertyType = { title: string; route: string }[];

export type PropertyOfElementOfFolderArrType = {
  value: AdditionalFolderPropertyNames;
  onClick?: (e: any) => void;
  route?: string;
  customComponent?: any;
  additionalArr?: FolderAdditionalArrPropertyType;
};

export type DefaultPropertyiesOfElementOfFolderArrType = {
  property: PropertyOfElementOfFolderArrType;
  id: string;
};

export type ElementOfFolderArrType = {
  iconName: string;
  title: string;
  color: ColorType;
} & DefaultPropertyiesOfElementOfFolderArrType;

export type FolderArrType = ElementOfFolderArrType[];
export type FolderIdType = string;

export type FolderType = {
  id: FolderIdType;
  label: string;
  arr: FolderArrType;
};

export type FoldersType = {
  [key: string]: FolderType;
};

export interface IGlobalEvent {
  title: TitleType;
  iconName: IconNameType;
  id: string;
  value: EventyValueType;
  onlyTime?: boolean;
  variant: LabelVariantType;
  color: string;
  isFolderIsPlaceholder?: boolean;
}

export interface DefaultFolderElementInterface {
  title: TitleType;
  iconName?: string;
  id: string;
  route?: string;
  color?: ColorType;
  property?: string;
}

export interface PakeepEventInteface {
  id: string;
  value: number | Date;
}

// export type PakeepIdType = Brand<string, '_pakeepId'>;
export type PakeepIdType = string;

export type DefaultFolderElementPropertyNamesType = keyof typeof pakeepPropertyiesNames;
export type DefaultFolderElementPropertyType = {
  [Property in DefaultFolderElementPropertyNamesType]: boolean;
};
export type LabelIdType = string;
export type LabelsOfPakeepType = LabelIdType[];

export type EventyValueType = number | Date;
export type EventIdType = string;
export type EventOfPakeepType = { id: EventIdType; value: EventyValueType };

export type EventsOfPakeepType = EventOfPakeepType[];

export type TitleOfPakeepType = string | string[];
export type TextOfPakeepType = string | string[];

export type TitleAndTextOfPakeepType = {
  title: TitleOfPakeepType;
  text: TextOfPakeepType;
};

export type CheckBoxElementType = { color: ColorType; value: string; isAccomplished: boolean; id: string };
export type CheckBoxesArrtype = CheckBoxElementType[];

export type DefaultPakeepElementType = {
  color: ColorType;
  labels: LabelsOfPakeepType;
  events: EventsOfPakeepType;
  readonly id: PakeepIdType;
  backgroundColor: ColorType;
};

export type PakeepElementType = DefaultFolderElementPropertyType &
  TitleAndTextOfPakeepType &
  DefaultPakeepElementType & { checkBoxes: CheckBoxesArrtype };

export interface ILabelElement {
  color: ColorType;
  title: string;
  iconName: IconNameType;
  id: LabelIdType;
  variant: LabelVariantType;
}
export type GlobalLabelsType = ILabelElement[];
export type GlobalEventsType = IGlobalEvent[];

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
export type PakeepsType = PakeepElementType[];

export type IsMenuOpenType = keyof typeof menuOpenStatusDenotation;
export type DefaultFolderArrType = DefaultFolderElementInterface[];

export type AvatarPropertiesType = {
  url: string;
  borderRadius: number;
  backgroundColor: string;
};

export type LocalPasswordType = typeof NONE | string;

export type UserDataType = {
  email: string;
  userName: string;
  isEmailVerified: boolean;
  name: string;
  isEmailPubic: boolean;

  localPinCode: LocalPasswordType;
};

export type HeaderPropertyiesType = {
  order: OrderOfHeaderUtilsType;
};

export type FolderOrderNamesValueType = string[];
export type FolderOrderNamesType = { [key: string]: FolderOrderNamesValueType };

export type NamesArrOFOrderOfHeaderUtilsType = (keyof typeof headerProfileUtilsDenotationIds)[];

export type OrderOfHeaderUtilsType = {
  names: NamesArrOFOrderOfHeaderUtilsType;
  exclusionNames: NamesArrOFOrderOfHeaderUtilsType;
};

export type OrderOfOnlyOnePakeepColumnType = string[];
export type InitialiAppFirebaseData = {
  avatarProperties: AvatarPropertiesType;
  labels: GlobalLabelsType;
  dimensions: DimensionsType;
  events: GlobalEventsType;
  orderOfOnlyOnePakeepColumn: OrderOfOnlyOnePakeepColumnType;
  querySearchArr: string[];
  headerPropertyies: HeaderPropertyiesType;
  folderOrderNames: FolderOrderNamesType;
  pakeeps: PakeepsType;
  userData: UserDataType;
  pakeepsOrderNames: OrderNamesType;
  pinnedPakeepsOrderNames: OrderNamesType;
};
export type AppInitialStateType = {
  temporaryData: TemporaryDatatype;
} & InitialiAppFirebaseData;

export type PakeepPropertyValueType = $Values<PakeepElementType>;
export type PakeepPropertyKeysType = $Keys<PakeepElementType>;

export type OperateWOP<N> = (payload: N) => void;

export type GlobalFolderIdType = string;

export type PakeepItemDimensionsType = { gapX: number; gapY: number };

export type PakeepDimensionsType = {
  container: {
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
  };
  pakeepItem: PakeepItemDimensionsType;
};
export type DimensionsType = {
  folder: FolderDimensionsType;
  pakeep: PakeepDimensionsType;
};

export type NamesOfSearchPropertyiesType = keyof typeof allPakeeepsSearchPropertyies;
export type ValueOfSearchPropertyiesType = any;
export type SearchPropertyiesType = {
  value: ValueOfSearchPropertyiesType;
  name: NamesOfSearchPropertyiesType;
};

export type NotifinationArrType = HeaderMenuArrItemType[];

export type TemporaryDatatype = {
  isCancelSelectedPakeepsId: boolean;
  selectedPakeepsId: SelectedPakeepsIdType;
  isUseEditingDialogAsNewPakeep: boolean;
  searchPropertyies: SearchPropertyiesType;
  isAllDataWasUploaded: boolean;
  drawerWidth: DrawerWidthType;
  additionalMenuState: { id: string; arrLength: number };
  menuOpenStatus: IsMenuOpenType;
  globalFolderId: GlobalFolderIdType;
  isCurrentNumberOfPakeepColumnsIsOne: boolean;
  headerHeight: number;
  notifinationArr: NotifinationArrType;
  menuAccountUtilsArr: NotifinationArrType;
  defaultMenuProps: DefaultMenuPropsType[] | typeof NONE;
  defaultDialogProps: DefaultDialogPropsType[] | typeof NONE;
  isAuthedWithLocalPinCode: boolean;
  isZenModeActive: boolean;
  pakeep: {
    id: string;
    isHovering: boolean;
  };
  globalLabelList: LabelsOfPakeepType;
  globalEventList: EventsOfPakeepType;
};

export type DefaultMenuPropsType = {
  id: string;
  customColor?: CustomColorType;
  name: MenusLayoutName;
} & CoordinatesType;

export type DefaultDialogPropsType = {
  id: string;
  customColor?: CustomColorType;

  name: DialogLayoutName;
};

export type CoordinatesType = {
  mouseX: number;
  mouseY: number;
};
