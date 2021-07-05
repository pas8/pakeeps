import { CustomColorType } from 'models/types';
import { ReactNode } from 'react';

export type UseStylesOfMainDefaultPartOfPakeepElementType = {
  customColor: CustomColorType;
};

export type MainDefaultPartOfPakeepElementPropsType = {
  children: ReactNode;
  isPinIconButtonHidden: boolean;
  className?: any;
  onClickOfPinIconButton?: ()=> void;
  text: string;
  title: string;
  onClick?: ()=> void;
} & UseStylesOfMainDefaultPartOfPakeepElementType;
