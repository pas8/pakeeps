import { LabelsOfPakeepType } from './../../../../../../store/modules/App/types';
import { CustomColorType, UseStylesCustomColorType } from 'models/types';
import { Dispatch, SetStateAction } from 'react';
import { ILabelElement, LabelIdType } from 'store/modules/App/types';
import { HandleChangeNewLabelType, MenuStateOfLabelsListType } from '../../types';

export type UseStylesOfGlobalLabelListOflabelListType = {
  color: string;
  isChecked?: boolean;
} & UseStylesCustomColorType;

export type GlobalLabelListOflabelListPropsType = {
  handleChangeNewLabel: HandleChangeNewLabelType;
  selectedLabels: LabelsOfPakeepType;
  setMenuState: Dispatch<SetStateAction<MenuStateOfLabelsListType>>;
} & UseStylesCustomColorType;
