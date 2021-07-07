import { CustomColorType } from 'models/types';
import { ReactNode } from 'react';

export type UseStylesOfEventItemType = {
  customColor: CustomColorType;
};

export type EventItemPropsType = UseStylesOfEventItemType & {
  icon: ReactNode;
  title: string | ReactNode;
  value: string | ReactNode;
};
