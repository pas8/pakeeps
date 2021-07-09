import { RgbaColor } from 'colord';
import { Dispatch, SetStateAction } from 'react';
import { formats } from './index';

export type ColorOfInputsUtils = string | RgbaColor;

export type InputsColorUtilsOfCustomColorPickerPropsType = {
  color: ColorOfInputsUtils;
  setColor: Dispatch<SetStateAction<string | RgbaColor>>;
  colorInHexFormat: string;
  customFormatName: FormatType;
  isInputsHaveSameGap?: boolean;
  gradientStatus?: boolean;
  focusOfPicker?: any;
  isHexInputHidden?: boolean;
  isCustomFormatInputHidden?: boolean;
  inputColor?: string;
  isUseAlpha?: boolean;
};

export type UseStylesOfInputsColorUtilsOfCustomColorPickerType = {
  colorInHexFormat: string;
  isInputsHaveSameGap: boolean;
};

export type FormatType = formats;

export type OnChangeOfCustomFormatStateType = ({
  target: { value, name }
}: {
  target: { value: string | number; name: string | number };
}) => void;
