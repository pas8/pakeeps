import { DefaultFolderArrType, GlobalLabelsType } from './../store/modules/App/types';
import { PropertyiesOfPakeepElement } from './../components/PakeepList/components/PakeepElement/types';
import { TimeAndDateFromatType, TimeFormatType } from './../store/modules/Settings/types';
import { SettingsInitialStateType } from 'store/modules/Settings/types';
import { ColorInitialStateType } from 'store/modules/Color/types';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { ReactNode } from 'react';
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
import { IconsUtilsArrType, IconsUtilsFunctionType, NullityOfSlicedArrType } from 'components/IconsUtils/types';
import { AuthInitialStateType } from 'store/modules/Auth/types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export type SelectedPakeepsType = PakeepsType;
export type SelectedPakeepsIdType = PakeepIdType[];

export type UseSlicedType = (
  widthOfContainer?: number,
  arrWhichShouldBeSliced?: IconsUtilsArrType
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

export type UseFindPakeepUsingIdType = (id: PakeepIdType) => PakeepElementType;

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
  folderProperty,
  folderId,
  isPakeepDragContextPinned
}: {
  notValidatedPakeepsInColumn: (PakeepElementType | null)[];
  isPakeepDragContextPinned: boolean;
  folderProperty: FolderPropetyType;
  folderId: string;
}) => PakeepsType | null;

export type FolderPropetyType = DefaultFolderElementPropertyNamesType | 'label' | 'ALL';

export type UseAttributeGroupColorType = (
  customColor: CustomColorType,
  currentColor: string
) => [string, boolean, boolean];

export type UsePakeepFoldersType = ({
  labels,
  defaultFolderArr
}: {
  labels: GlobalLabelsType;
  defaultFolderArr: DefaultFolderArrType;
}) => DefaultFolderArrType[];
export type ThunkType<P> = ThunkAction<any, RootStoreType, null, Action<P>>;
