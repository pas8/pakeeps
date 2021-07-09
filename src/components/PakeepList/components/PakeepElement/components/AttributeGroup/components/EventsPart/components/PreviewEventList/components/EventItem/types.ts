import { CustomColorType } from 'models/types';
import { ReactNode } from 'react';
import { ColorType, LabelIdType } from 'store/modules/App/types';

export type UseStylesOfEventItemType = {
  customColor: CustomColorType;
  color: ColorType;
  parentBackgroundColor: ColorType;
  variant: LabelIdType;
};

export type EventItemPropsType = UseStylesOfEventItemType & {
  icon: ReactNode;
  title: string | ReactNode;
  value: string | ReactNode;
};
