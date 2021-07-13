import { IconsUtilsPropsType } from './../components/IconsUtils/types';
import { Optional } from 'utility-types';
import {
  CheckBoxesArrtype,
  ColorType,
  DefaultFolderArrType,
  DefaultFolderElementPropertyType,
  DefaultPakeepElementType,
  FolderOrderNamesType,
  FolderOrderNamesValueType,
  FoldersType,
  GlobalLabelsType,
  LabelsOfPakeepType,
  LabelVariantType,
  TitleAndTextOfPakeepType
} from './../store/modules/App/types';
import { PropertyiesOfPakeepElement } from './../components/PakeepList/components/PakeepElement/types';
import { TimeAndDateFromatType, TimeFormatType } from './../store/modules/Settings/types';
import { SettingsInitialStateType } from 'store/modules/Settings/types';
import { ColorInitialStateType } from 'store/modules/Color/types';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { ChangeEventHandler, Dispatch, ReactNode, SetStateAction } from 'react';
import {
  AppInitialStateInteface,
  GlobalEventsType,
  PakeepIdType,
  PakeepsType,
  PakeepElementType,
  PakeepEventInteface,
  EventOfPakeepType,
  EventsOfPakeepType,
  LabelIdType,
  ILabelElement,
  DefaultFolderElementPropertyNamesType
} from 'store/modules/App/types';
import { HandleSelectedPakeepsPropertyFuncType, PakeepPropertyiesType } from 'components/HeaderWhenActiveSelecto/types';
import {
  EventsListProps,
  IconsUtilsArrType,
  IconsUtilsFunctionType,
  NullityOfSlicedArrType
} from 'components/IconsUtils/types';
import { AuthInitialStateType } from 'store/modules/Auth/types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import {
  DefaultLabelListPropsType,
  HandleLabelFuncsOfLabelListType
} from 'components/IconsUtils/components/LabelsList/types';
import { Theme } from '@material-ui/core';
import { UseMeasureRef } from 'react-use/lib/useMeasure';

export type SelectedPakeepsType = PakeepsType;
export type SelectedPakeepsIdType = PakeepIdType[];

export type UseSlicedType = (
  widthOfContainer?: number,
  arrWhichShouldBeSliced?: IconsUtilsArrType,
  dependency?: IconsUtilsPropsType
) => [slicedArr: NullityOfSlicedArrType, isShouldBeSliced: boolean, handleConcatAverageWidth: (value: number) => void];

export type UsePropertiesToUtilsType = (
  pakeepPropertyies: PakeepPropertyiesType,
  selectedPakeeps: SelectedPakeepsType,
  handleSelectedPakeepsPropertyFunc: HandleSelectedPakeepsPropertyFuncType,
  cancelSelectedPakeepsId: () => void
) => Object;

export type RootStoreType = {
  auth: AuthInitialStateType;
  app: AppInitialStateInteface;
  color: ColorInitialStateType;
  settings: SettingsInitialStateType;
};

export type LayoutChildrenType = { children: ReactNode };

export type AllElementsIsBooleanType = {
  [key: string]: boolean;
};

export type CustomColorType = {
  isUseDefault: boolean;
  hover: string;
  unHover: string;
  bgHover: string;
  bgUnHover: string;
  secondaryColor: string;
};

export type ColorStateType = [CustomColorType, boolean, boolean];

export type CurrentTargetType = any;

export type UseStylesCustomColorType = { customColor: CustomColorType };

export type ClosePopoverOrMenuType = (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void;

export type ColumnElementType = { id: string; pakeepsId: PakeepIdType[] };
export type SumOfPakeepsReduceFuncType = { [key: string]: ColumnElementType };

export type PakeepsReduceFuncType = (
  sum: SumOfPakeepsReduceFuncType,
  id: string,
  idx: number
) => SumOfPakeepsReduceFuncType;

export type CurrentEventsElementType = {
  id: string;
  inputValue: string;
  format: string;
  value: number | Date;
  isChosen: boolean;
  title: string;
  variant: LabelVariantType;
  iconName: string;
  onlyTime?: boolean;
  color: string;
};

export type CurrentEventsArrType = CurrentEventsElementType[];

export type UseFindCurrentEventsType = (
  globalEvents: GlobalEventsType,
  events: EventsOfPakeepType,
  timeFormat: TimeFormatType,
  timeAndDateFromat: TimeAndDateFromatType
) => CurrentEventsArrType | null;

export type UsePakeepUtilsFuncType = (pakeepId: PakeepIdType) => IconsUtilsFunctionType;

export type UseFindPakeepUsingIdType = (id: PakeepIdType) => PakeepElementType | null;

export type IconType = typeof AddCircleOutlineOutlinedIcon;

export type HandlePakeepEventsType = (events: EventsOfPakeepType) => void;

export type HandleDeleteNewLabelType = (labelIdWhichShouldBeDeleted: LabelIdType) => void;
export type HandleAddNewLabelType = (labelIdWhichShouldBeAdded: LabelIdType) => void;

export type UseLabelListFuncType = (id: PakeepIdType) => {
  handleAddNewLabel: HandleDeleteNewLabelType;
  handleDeleteNewLabel: HandleAddNewLabelType;
};

export type UseFindLabelItem = (labelId: LabelIdType) => ILabelElement;

export type UseValidationOfPakeepsInColumnType = ({
  notValidatedPakeepsInColumn,
  isPakeepDragContextPinned
}: {
  notValidatedPakeepsInColumn: (PakeepElementType | null)[];
  isPakeepDragContextPinned: boolean;
}) => PakeepsType | null;

export type FolderPropetyType = DefaultFolderElementPropertyNamesType | 'label' | 'ALL' | 'event';

export type UseAttributeGroupColorType = (
  customColor: CustomColorType,
  currentColor: string
) => [string, boolean, boolean];

export type UsePakeepFoldersType = ({
  labels,
  events
}: {
  labels: GlobalLabelsType;
  events: GlobalEventsType;
}) => FoldersType;

export type HandleChangeInputsValueType = ChangeEventHandler<HTMLInputElement>;

export type UseNewPakeepUtilityType = ({
  defaultState,
  defaultInputState,
  defaultCheckBoxesValue
}: {
  defaultInputState: TitleAndTextOfPakeepType;
  defaultCheckBoxesValue: CheckBoxesArrtype;
  defaultState: DefaultPakeepElementType & DefaultFolderElementPropertyType;
}) => {
  setState: Dispatch<SetStateAction<any>>;
  state: PakeepElementType;
  eventsListProps: EventsListProps;
  labelsOfAttributeGroup: GlobalLabelsType;
  setCheckBoxes: Dispatch<SetStateAction<CheckBoxesArrtype>>;
  handleChangeInputsValue: HandleChangeInputsValueType;
  iconUtilsFuncs: IconsUtilsFunctionType;
  defaultLabelListProps: DefaultLabelListPropsType;
};

export type UseFindSelectedLabelsType = (selectedPakeeps: PakeepsType) => LabelsOfPakeepType;
export type UseFindSelectedEventsType = (selectedPakeeps: PakeepsType) => EventsOfPakeepType;

export type UseValidateFolderColorType = (color: ColorType) => string;

export type UseTakeFoldersArrType = (props: {
  handleCloseFoldersWithDrawerView: () => void;
  isFoldersHaveDraweView: boolean;
}) => {} & ReturnValueOfUseFindFolderOrderNamesType;

export type ParamsOfUseFindCorrectFoldersPropertyiesType = {
  [Property in
    | 'defaultPakeepFolders'
    | 'defaultFoldersBefore'
    | 'defaultForderAfter'
    | 'defaultSettingsFolders']: FoldersType;
};

export type UseFindCorrectFoldersPropertyiesType = (params: ParamsOfUseFindCorrectFoldersPropertyiesType) => {
  correctFolders: FoldersType;
  correctFolderValueOrder: FolderOrderNamesValueType;
};

export type ButtonGroupDimensionsType = {
  [Property in 'marginLeft' | 'marginRight' | 'marginBottom' | 'marginTop' | 'labelHeight']: number;
};
export type ButtonItemDimensionsType = {
  [Property in 'defaultWidth' | 'height']: number;
};

export type FolderDimensionsType = {
  buttonGroup: ButtonGroupDimensionsType;
  buttonItem: ButtonItemDimensionsType;
};

export type ReturnValueOfUseFindFolderOrderNamesType = {
  foldersAfter: FoldersType;
  foldersBefore: FoldersType;
  folderOrderNames: FolderOrderNamesValueType;
  folderDimensions: FolderDimensionsType;
};

export type UseFindFolderOrderNamesType = (
  notValidatedAllFolders: FoldersType,
  notValidatedFolderOrderNames: FolderOrderNamesValueType
) => ReturnValueOfUseFindFolderOrderNamesType;
