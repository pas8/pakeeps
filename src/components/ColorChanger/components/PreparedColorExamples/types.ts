import { RgbaColor } from 'colord';
import { CustomColorType } from 'models/types';

export type PreparedColorExamplesPropsType = {
  color: string | RgbaColor
  isExtended: boolean;
  customColor: CustomColorType;
  handleSetColor: any;
  isColor?: boolean;
  customColumnElementProps?: object;
  CustomColumnElement?: any;
  columnArr: any[];
};
