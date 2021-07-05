import { CustomColorType, UseStylesCustomColorType } from 'models/types';
import { Dispatch, SetStateAction } from 'react';
import { ILabelElement, LabelIdType } from 'store/modules/App/types';
import { HandleChangeNewLabelType, MenuStateOfLabelsListType } from '../../types';

export type SelectedLabelsType = LabelIdType[];

export type UseStylesOfGlobalLabelListOflabelListType = {
  color: string;
  isChecked?: boolean;
} & UseStylesCustomColorType;

export type GlobalLabelListOflabelListPropsType = {
  handleChangeNewLabel: HandleChangeNewLabelType;
  selectedLabels: SelectedLabelsType;
  setMenuState: Dispatch<SetStateAction<MenuStateOfLabelsListType>>;
} & UseStylesCustomColorType;
