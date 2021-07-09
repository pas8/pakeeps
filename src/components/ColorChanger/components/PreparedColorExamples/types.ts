import { CustomColorType } from 'models/types';

export type PreparedColorExamplesPropsType = {
  color: string;
  isExtended: boolean;
  customColor: CustomColorType;
  handleSetColor: any;
  isColor?: boolean;
  customColumnElementProps: object;
  CustomColumnElement: any;
  columnArr: any[];
};
