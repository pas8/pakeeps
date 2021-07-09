import { CustomColorType, IconType } from 'models/types';
import { MouseEventHandler } from 'react';
import { UseStylesOfGlobalLabelListOflabelListType } from './../../types';


export type IconsUtilsOfGlobalLabelListOflabelListPropsType = { onClickOfEditButton: (e: any) => void; customColor: CustomColorType }

export type LabelElementOfGlobalLabelListOflabelListPropsType = {
  onClickOfCheckBoxContainer: () => void;
  checkedIcon: IconType;
  Icon: IconType;
  customColor: CustomColorType;
  isIndeterminateChecked: boolean;
  iconsUtilsOfGlobalLabelListOflabelListProps:IconsUtilsOfGlobalLabelListOflabelListPropsType ;
  title: string;
} & UseStylesOfGlobalLabelListOflabelListType;
