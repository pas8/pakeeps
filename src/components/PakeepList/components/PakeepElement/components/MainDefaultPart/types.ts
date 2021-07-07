import { CustomColorType } from 'models/types';
import { ReactNode } from 'react';
import { CheckBoxesArrtype } from 'store/modules/App/types';

export type UseStylesOfMainDefaultPartOfPakeepElementType = {
  customColor: CustomColorType;
};

export type MainDefaultPartOfPakeepElementPropsType = {
  children: ReactNode;
  isPinIconButtonHidden: boolean;
  className?: any;
  isCheckBoxes: Boolean;
  checkBoxes: CheckBoxesArrtype;
  onClickOfPinIconButton?: () => void;
  text: string;
  title: string;
  onClick?: () => void;
} & UseStylesOfMainDefaultPartOfPakeepElementType;
