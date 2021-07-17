import { CustomColorType } from 'models/types';
import { GlobalLabelsType, ILabelElement, LabelsOfPakeepType, PakeepIdType } from 'store/modules/App/types';

export type LabelPartPropsType = {
  labels: GlobalLabelsType;
  pakeepId: PakeepIdType;
  parentBackgrounColor: string;
  customColor: CustomColorType;
};
