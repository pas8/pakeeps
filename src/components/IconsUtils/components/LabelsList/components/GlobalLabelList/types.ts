import { LabelsOfPakeepType } from './../../../../../../store/modules/App/types';
import { UseStylesCustomColorType } from 'models/types';
import { HandleChangeNewLabelType } from '../../types';

export type UseStylesOfGlobalLabelListOflabelListType = {
  color: string;
  isChecked?: boolean;
} & UseStylesCustomColorType;

export type GlobalLabelListOflabelListPropsType = {
  handleChangeNewLabel: HandleChangeNewLabelType;
  selectedLabels: LabelsOfPakeepType;
} & UseStylesCustomColorType;
