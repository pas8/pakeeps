import { CustomColorType } from 'models/types';
import { LabelIdType, PakeepIdType } from 'store/modules/App/types';

export type HandleAddNewLabelType = (id: LabelIdType) => void;
export type HandleDeleteNewLabelType = (id: LabelIdType) => void;

export type LabelsListPropsType = {
  handleAddNewLabel: HandleAddNewLabelType;
  handleDeleteNewLabel: HandleDeleteNewLabelType;
  handleStatusOfHideLabelView: () => void;
  isLabelViewHidden?: boolean;
  isDefaultMenuListHidden?: boolean;
  customColor: CustomColorType;
  onMenuClose: () => void;
  pakeepId: PakeepIdType;
};
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
