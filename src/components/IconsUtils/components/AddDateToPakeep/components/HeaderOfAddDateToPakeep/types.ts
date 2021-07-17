import { CustomColorType } from 'models/types';
import { ReactNode } from 'react';

export type UseStylesOfHeaderOfAddDateToPakeepType = {
  customColor: CustomColorType;
  isHideBorder?: boolean;
};

export type HeaderOfAddDateToPakeepPropsType = UseStylesOfHeaderOfAddDateToPakeepType & {
  buttonSaveState?: string;
  arrowButtonFunc: ()=> void;
  dynamicTitle?: string;
  isSaveButtonHidden?: boolean;
  onClickOfSaveButton: ()=> void;
  customTitle?: ReactNode;
};
