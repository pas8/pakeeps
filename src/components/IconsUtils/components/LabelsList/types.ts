import { CustomColorType } from 'models/types';
import { LabelIdType, LabelsOfPakeepType, PakeepIdType } from 'store/modules/App/types';

export type HandleAddNewLabelType = (id: LabelIdType) => void;
export type HandleDeleteNewLabelType = (id: LabelIdType) => void;

export type HandleLabelFuncsOfLabelListType = {
  handleAddNewLabel: HandleAddNewLabelType;
  handleDeleteNewLabel: HandleDeleteNewLabelType;
};

export type DefaultLabelListPropsType = {
  labels: LabelsOfPakeepType;
  pakeepId: PakeepIdType;
} & HandleLabelFuncsOfLabelListType;

export type LabelsListPropsType = {
  isDefaultMenuListHidden?: boolean;
  customColor: CustomColorType;
  onMenuClose: () => void;
} & IconUtilsLabelsListPropsType;

export type IconUtilsLabelsListPropsType = {
  handleStatusOfHideLabelView?: () => void;
  isLabelViewHidden?: boolean;
} & DefaultLabelListPropsType;

export type MenuStateOfLabelsListType = {
  mouseX: number;
  mouseY: number;
  id: string;
  variant: string;
  labelIconName: string;
  title: string;
  color: string;
};

export type HandleChangeNewLabelType = (isChecked: boolean, id: LabelIdType) => void;
