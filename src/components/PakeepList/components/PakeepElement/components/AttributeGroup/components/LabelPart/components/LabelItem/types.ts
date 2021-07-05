import { ChipProps } from '@material-ui/core';
import { CustomColorType } from 'models/types';
import { ColorType } from 'store/modules/App/types';

export type DefaultUseStylesOfLabelItemType = {
  parentBackgrounColor: string;
  aplyMargin: boolean;
};

export type UseStylesOfLabelItemType = {
  color: string;
  isDark: boolean;
  isCustomColor: boolean;
} & DefaultUseStylesOfLabelItemType;

export type LabelItemPropsType = {
  currentColor: ColorType;
  handleOpen: any;
  labelChipProps: ChipProps;
  customColor: CustomColorType;
} & DefaultUseStylesOfLabelItemType;
