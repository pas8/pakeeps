import { CustomColorType } from 'models/types';
import { ReactNode } from 'react';
import { CheckBoxesArrtype, TitleAndTextOfPakeepType } from 'store/modules/App/types';

export type UseStylesOfMainDefaultPartOfPakeepElementType = {
  customColor: CustomColorType;
};

export type MainDefaultPartOfPakeepElementPropsType = {
  children: ReactNode;
  isPinIconButtonHidden: boolean;
  className?: any;
  isCheckBoxes: Boolean;
  checkBoxes?: CheckBoxesArrtype;
  onClickOfPinIconButton?: () => void;
  onClick?: () => void;
} & UseStylesOfMainDefaultPartOfPakeepElementType &
  TitleAndTextOfPakeepType;
