import { ReactNode } from 'react';
import { IconType, UseStylesCustomColorType } from 'models/types';

export type DefaultMenuListOflabelListPropsType = {
  arrowButtonFunc: () => void;
  defaultMenuListArr: { title: string; Icon: IconType; onClick: () => void }[];
} & UseStylesCustomColorType;
