import { CustomColorType } from 'models/types';
import { ChangeEvent } from 'react';

export type UseStylesOfTitleChangerOfLabelType = {
  customColor: CustomColorType;
};

export type TitleChangerOfLabelPropsType = {
  [key: string]: any;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & UseStylesOfTitleChangerOfLabelType;
