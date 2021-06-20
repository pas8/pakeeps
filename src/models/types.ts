import { TimeAndDateFromatType, TimeFormatType } from './../store/modules/Settings/types';
import { SettingsInitialStateType } from 'store/modules/Settings/types';
import { ReactNode } from 'react';
import { ColorInitialStateType } from 'store/modules/Color/interfaces';
import {
  AppInitialStateInteface,
  GlobalEventsType,
  PakeepIdType,
  PakeepsType,
  PakeepElementType
} from 'store/modules/App/types';
import { HandleSelectedPakeepsPropertyFuncType, PakeepPropertyiesType } from 'components/HeaderWhenActiveSelecto/types';
import { IconsUtilsArrType, IconsUtilsFunctionType } from 'components/IconsUtils/types';

export type SelectedPakeepsType = PakeepsType;
export type SelectedPakeepsIdType = PakeepIdType[];

export type useSlicedType = (widthOfContainer?: number, arrWhichShouldBeSliced?: IconsUtilsArrType) => any[];

export type UsePropertiesToUtilsType = (
  pakeepPropertyies: PakeepPropertyiesType,
  selectedPakeeps: SelectedPakeepsType,
  handleSelectedPakeepsPropertyFunc: HandleSelectedPakeepsPropertyFuncType,
  cancelSelectedPakeepsId: () => void
) => Object;

export type RootStoreType = {
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
  events: GlobalEventsType,
  timeFormat: TimeFormatType,
  timeAndDateFromat: TimeAndDateFromatType
) => CurrentEventsArrType;

export type UsePakeepUtilsFuncType = (pakeepId: PakeepIdType) => IconsUtilsFunctionType;

export type UseFindPakeepUsingIdType = (pakeeps: PakeepsType, id: PakeepIdType) => PakeepElementType | void;
