import { CustomColorType } from 'models/types';
import { MouseEvent, ReactNode } from 'react';
import { ColorType, LabelIdType } from 'store/modules/App/types';

export type OnClickOfEventItemType = (event: MouseEvent<HTMLElement>) => void;
export type UseStylesOfEventItemType = {
  customColor: CustomColorType;
  color: ColorType;
  parentBackgroundColor: ColorType;
  variant: LabelIdType;
};

export type EventItemPropsType = UseStylesOfEventItemType & {
  icon: ReactNode;
  title: string | ReactNode;
  onClick?: OnClickOfEventItemType;
  value: string | ReactNode;
};
