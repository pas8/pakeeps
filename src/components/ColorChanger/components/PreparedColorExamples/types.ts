import { RgbaColor } from 'colord';
import { CustomColorType } from 'models/types';

export type ColumnElementType = { id: string; [key: string]: any };
export type ColumnArrType = ColumnElementType[];

export type PreparedColorExamplesPropsType = {
  handleSetColor: any;
  isColor?: boolean;

  customColumnElementProps?: object;
  CustomColumnElement?: any;
  columnArr: ColumnArrType;
} & DefaultColumnElementPropsType;

export type ColumnOfPreparedColorExamplesPropsType = {
  isColor?: boolean;

  columnElements: ColumnArrType;
  columnElementProps: any;
  droppableId: string;
  CustomColumnElement: any;
  customColor: CustomColorType;
};

export type HandleSetColorType = (color: string) => void;

export type DefaultColumnElementPropsType = {
  handleSetColor: HandleSetColorType;
  customColor: CustomColorType;
  isExtended?: boolean;
  color: string | RgbaColor;
};
export type ColumnElementOfPreparedColorExamplesPropsType = {
  colorName: string;
} & DefaultColumnElementPropsType;

export type UseStylesOfColumnElementOfPreparedColorExamplesType = {
  isColorLight?: boolean;
  isBgColorLight?: boolean;
  customColor: CustomColorType;
};
