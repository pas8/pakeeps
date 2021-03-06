import { IconsUtilsArrDenotationOfColorPickerType } from 'components/ColorChanger/components/CustomColor/components/IconsUtils/types';
import { CustomColorType, IconType } from 'models/types';
import { ReactNode } from 'react';
import {
  EventsOfPakeepType,
  GlobalEventsType,
  GlobalLabelsType,
  LabelsOfPakeepType,
  PakeepIdType
} from 'store/modules/App/types';
import { $Values } from 'utility-types';
import { IconUtilsLabelsListPropsType, LabelsListPropsType } from './components/LabelsList/types';
import { iconsUtilsArrDenotation } from './denotation';

export type IconsUtilsFunctionKeyNameType =
  | 'handleSetBookmarkPakeep'
  | 'handleSetBackgroundColorPakeep'
  | 'handleSetColorPakeep'
  | 'handleSetFavoritePakeep'
  | 'handleSetIsCheckBoxesPakeep'
  | 'handleSetIsPinnedPakeep'
  | 'handleSetWidth'
  | 'handleSetEditTitleIsTrue'
  | 'handleSetArhivedPakeep'
  | 'handleUndo'
  | 'handleRedo';

export type IconsUtilsFunctionType = {
  [Property in IconsUtilsFunctionKeyNameType]?: (any?: any) => void;
};

export type IconsUtilsValuesType = {
  isCheckBoxes?: boolean;
  isEditingUtilsHidden?: boolean;
  isColorDefault?: boolean;
  isFavorite?: boolean;
  isInBookmark?: boolean;
  isPinned?: boolean;
  labels?: LabelsOfPakeepType;
  events?: EventsOfPakeepType;
  isNewPakeepContainerHaveFullWidth?: boolean;
  isChangingTitle?: boolean;
};

export type EventsListProps = {
  handleSaveEvents: (events: any) => void;
  events: EventsOfPakeepType;
};

export type IconsUtilsPropetyiesType = {
  isBackgroundColorDefault?: boolean;
  backgroundColor?: any;
  customColor: CustomColorType;
  isAllIconsIsShown?: boolean;
  labelBargeNumber?: number;
  labelsListProps?: IconUtilsLabelsListPropsType;
  open?: boolean;
  eventsListProps: EventsListProps;
  widthOfContainer?: number;
  isUtilsReversed?: boolean;
  arrOfButtonNamesWhichSholudBeHidden?: IconsUtilsArrDenotationNameType[];
  id: PakeepIdType;
};

export type IconsUtilsPropsType = IconsUtilsFunctionType & IconsUtilsValuesType & IconsUtilsPropetyiesType;

export type IconsUtilsArrDenotationType =
  | $Values<typeof iconsUtilsArrDenotation>
  | IconsUtilsArrDenotationOfColorPickerType;
export type IconsUtilsArrDenotationNameType = $Values<Pick<IconsUtilsArrDenotationType, 'name'>>;

export type IconUtilElementOptionalPropertyiesType = {
  isIconActive?: boolean;
  menuComponentsProps?: object;
  menuComponents?: ReactNode;
  ActiveIcon?: IconType;
  onClick?: () => void;
  popoverText?: string;
  activePopoverText?: string;
  badgeContent?: number | any;
  rotateDeg?: number;
  customElementComponentOfIconGroup?: ReactNode;
  hidden?: boolean;
};




export type IconUtilElementType = { icon: IconType } & IconUtilElementOptionalPropertyiesType &
  IconsUtilsArrDenotationType;

export type IconsUtilsArrType = IconUtilElementType[];

export type NullityOfSlicedArrType = { before: IconsUtilsArrType; after: IconsUtilsArrType };
