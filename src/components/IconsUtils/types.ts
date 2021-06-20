import { CustomColorType } from 'models/types';
import { ReactNode } from 'react';
import {
  EventsOfPakeepType,
  GlobalEventsType,
  GlobalLabelsType,
  LabelsOfPakeepType,
  PakeepIdType
} from 'store/modules/App/types';
import { $Values } from 'utility-types';
import { iconsUtilsArrDenotation } from './denotation';

export type LabelsListPropsType = Object;

export type IconsUtilsFunctionKeyNameType =
  | 'handleSetBookmarkPakeep'
  | 'handleSetBackgroundColorPakeep'
  | 'handleSetColorPakeep'
  | 'handleSetFavoritePakeep'
  | 'handleSetIsCheckBoxesPakeep'
  | 'handleSetIsPinnedPakeep'
  | 'handleSetWidth'
  | 'handleSetEditTitleIsTrue'
  | 'handleSetArhivedPakeep';

export type IconsUtilsFunctionType = {
  [Property in IconsUtilsFunctionKeyNameType]?: (any?: any) => void;
};

export type IconsUtilsValuesType = {
  isCheckBoxes?: boolean;
  isColorDefault?: boolean;
  isFavorite?: boolean;
  isInBookmark?: boolean;
  isPinned?: boolean;
  labels?: LabelsOfPakeepType;
  events?: EventsOfPakeepType;
  isNewPakeepContainerHaveFullWidth?: boolean;
  isChangingTitle?: boolean;
};

export type IconsUtilsPropetyiesType = {
  isBackgroundColorDefault?: boolean;
  backgroundColor?: any;
  customColor?: CustomColorType;
  isAllIconsIsShown?: boolean;
  labelBargeNumber?: number;
  labelsListProps?: any;
  open?: boolean;
  widthOfContainer?: number;
  isUtilsReversed?: boolean;
  arrOfButtonNamesWhichSholudBeHidden?: IconsUtilsArrDenotationNameType[];
  id: PakeepIdType;
};

export type IconsUtilsPropsType = IconsUtilsFunctionType & IconsUtilsValuesType & IconsUtilsPropetyiesType;

export type IconsUtilsArrDenotationType = $Values<typeof iconsUtilsArrDenotation>;
export type IconsUtilsArrDenotationNameType = $Values<Pick<IconsUtilsArrDenotationType, 'name'>>;

export type IconUtilElementOptionalPropertyiesType = {
  isIconActive?: boolean;
  menuComponentsProps?: object;
  menuComponents?: ReactNode;
  ActiveIcon?: ReactNode;
  onClick?: Function;
  popoverText?: string;
  activePopoverText?: string;
  badgeContent?: number | any;
  rotateDeg?: number;
  customElementComponentOfIconGroup?: ReactNode;
  hidden?: boolean;
};

export type IconUtilElementType = { icon: ReactNode } & IconUtilElementOptionalPropertyiesType &
  IconsUtilsArrDenotationType;

export type IconsUtilsArrType = IconUtilElementType[];

export type NullityOfSlicedArrType = { before: IconsUtilsArrType; after: IconsUtilsArrType };
