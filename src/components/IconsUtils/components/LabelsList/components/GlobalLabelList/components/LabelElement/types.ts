import { CustomColorType, IconType } from 'models/types';
import { UseStylesOfGlobalLabelListOflabelListType } from './../../types';
export type LabelElementOfGlobalLabelListOflabelListPropsType = {
  onClickOfCheckBoxContainer: () => void;
  checkedIcon: IconType;
  Icon: IconType;
  customColor: CustomColorType;
  isIndeterminateChecked: boolean;
  iconsUtilsOfGlobalLabelListOflabelListProps: object;
  title: string;
} & UseStylesOfGlobalLabelListOflabelListType;
