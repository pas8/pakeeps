import { IconsUtilsPropsType } from './../components/IconsUtils/types';
import { Optional } from 'utility-types';
import {
  CheckBoxesArrtype,
  ColorType,
  DefaultFolderArrType,
  DefaultFolderElementPropertyType,
  DefaultPakeepElementType,
  FolderArrType,
  FolderOrderNamesType,
  FolderOrderNamesValueType,
  FoldersType,
  GlobalLabelsType,
  LabelsOfPakeepType,
  LabelVariantType,
  PropertyOfElementOfFolderArrType,
  TitleAndTextOfPakeepType
} from './../store/modules/App/types';
import { PropertyiesOfPakeepElement } from './../components/PakeepList/components/PakeepElement/types';
import { TimeAndDateFromatType, TimeFormatType } from './../store/modules/Settings/types';
import { SettingsInitialStateType } from 'store/modules/Settings/types';
import { ColorInitialStateType } from 'store/modules/Color/types';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { ChangeEventHandler, Dispatch, ReactNode, SetStateAction, MouseEventHandler, MouseEvent } from 'react';
import {
  AppInitialStateType,
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
import { DialogProps, GridProps, TextFieldProps, Theme } from '@material-ui/core';
import { UseMeasureRef } from 'react-use/lib/useMeasure';
import {
  DefaultUseFindCorrectFolderFuncPropsType,
  HandelOpenAdditionalMenuType
} from 'components/Folders/components/ButtonGroup/types';
import { PropertyOfReturnValueOfUseFindFolderItemPropertyies } from './unums';
import { ListPlaceholdersOfFolderPropertyiesPropsType } from 'components/PakeepList/components/ListPlaceholdersOfFolderPropertyies/types';

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
  app: AppInitialStateType;
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
  events: EventsOfPakeepType
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

export type UsePakeepFoldersType = () => FoldersType;

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
  toNulittyPropertyState:()=> void;
  eventsListProps: EventsListProps;
  labelsOfAttributeGroup: GlobalLabelsType;
  setCheckBoxes: Dispatch<SetStateAction<CheckBoxesArrtype>>;
  handleChangeInputsValue: HandleChangeInputsValueType;
  iconUtilsFuncs: IconsUtilsFunctionType;
  defaultLabelListProps: DefaultLabelListPropsType;
};

export type DialogOfEnteringPasswordPropsType = {
  onConfirm: (e?: any) => void;
  onCancel: (e?: any) => void;
} & DialogProps &
  TextFieldProps;

export type UseFindSelectedLabelsType = (selectedPakeeps: PakeepsType) => LabelsOfPakeepType;
export type UseFindSelectedEventsType = (selectedPakeeps: PakeepsType) => EventsOfPakeepType;

export type UseValidateFolderColorType = (color: ColorType) => string;

export type UseTakeFoldersArrType = (
  props: {
    handleCloseFoldersWithDrawerView: () => void;
    isFoldersHaveDraweView: boolean;
  } & AdditionalParamsOfUseFindFolderOrderNamesType
) => {} & ReturnValueOfUseFindFolderOrderNamesType;

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
  [Property in 'defaultWidth' | 'height' | 'extendedWidth']: number;
};

export type FolderDimensionsType = {
  container: {
    [Property in 'paddingLeft' | 'paddingRight' | 'paddingBottom']: number;
  };
  buttonGroup: ButtonGroupDimensionsType;
  buttonItem: ButtonItemDimensionsType;
};

export type ReturnValueOfUseFindFolderOrderNamesType = {
  foldersAfter: FoldersType;
  foldersBefore: FoldersType;
  folderOrderNames: FolderOrderNamesValueType;
  folderDimensions: FolderDimensionsType;
};

export type HandleOpenMoreFoldersType = MouseEventHandler<HTMLButtonElement>;

export type AditionalFoldersHeigthObjType = {
  [key: string]: number;
};
export type AdditionalParamsOfUseFindFolderOrderNamesType = {
  handleOpenMoreFolders: HandleOpenMoreFoldersType;
  aditionalFoldersHeigthObj: AditionalFoldersHeigthObjType;
};

export type UseFindFolderOrderNamesType = (
  notValidatedAllFolders: FoldersType,
  notValidatedFolderOrderNames: FolderOrderNamesValueType,
  additionalParams: AdditionalParamsOfUseFindFolderOrderNamesType
) => ReturnValueOfUseFindFolderOrderNamesType;

export type ReturnValueOfUseFindCorrectFolderFuncType = { onClick: OnClickOfFolderButtonType; route: false | string };

export type UseFindCorrectFolderFuncType = (
  param: {
    property: PropertyOfElementOfFolderArrType;
    color: string;
    id: string;
    handelOpenAdditionalMenu?: HandelOpenAdditionalMenuType;
    isAdditionalButtonsVisible?: boolean;
  } & DefaultUseFindCorrectFolderFuncPropsType
) => ReturnValueOfUseFindCorrectFolderFuncType;

export type OnClickOfFolderButtonType = MouseEventHandler<HTMLElement>;

export type ReturnValueOfUseFindFolderItemPropertyiesType = {
  [Property in PropertyOfReturnValueOfUseFindFolderItemPropertyies]: boolean;
};

export type UseFindFolderItemPropertyiesType = (
  id: string,
  idx: number,
  globalFolderId: string,
  folderArrLength: number
) => ReturnValueOfUseFindFolderItemPropertyiesType;

export type ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType = {
  [key: string]: {
    component: any;
    onClick: (e: any) => void;
    toolTipText: string;
    iconName?: string;
  };
};
export type UseConvertHeaderProfileUtilsObjToFolderArrType = (
  arr: ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType
) => FolderArrType;

export type FieldSetContainerPropsType = { title: string; isOnlyTop?: boolean } & GridProps;

export type UseTakePakeepListPlaceholdersOfFolderPropertyiesType = () =>
  | false
  | ListPlaceholdersOfFolderPropertyiesPropsType;

export type ParamOfUseCloseDialogWithRestoreType<T> = {
  setState: Dispatch<SetStateAction<T>>;
  onClose: (__?: any) => void;
  state: T;
  snackBarMessage: string;
  nullityState: T;
};

export type UseCloseDialogWithRestoreType = <T>(param: ParamOfUseCloseDialogWithRestoreType<T>) => {
  handleCloseDialog: (__?: any) => void;
  isDialogOpen: boolean;
};
