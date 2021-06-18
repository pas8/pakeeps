import { CustomColorType } from 'models/types';
import { GlobalLabelsType, PakeepIdType } from 'store/modules/App/types';

export type LabelPartPropsType = {
  labels: GlobalLabelsType;
  handleDeleteLabelFromPakeepFunc: Function;
  handleChangeGlobalLabelItem: Function;
  pakeepId: PakeepIdType;
  parentBackgrounColor: string;
  customColor: CustomColorType;
};

export type MenuStateType = {
  mouseX: number;
  mouseY: number;
  id: string;
  variant: string;
  labelIconName: string;
  title: string;
  color: string;
};
