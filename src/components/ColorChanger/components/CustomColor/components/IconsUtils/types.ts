import { $Values, Omit } from 'utility-types';
import { CustomColorType } from 'models/types';
import { Dispatch, SetStateAction } from 'react';
import { FormatType } from '../InputsColorUtils/types';
import { CustomizationButtonPropsType } from 'components/ColorChanger/components/CustomizationButton/types';
import { iconsUtilsArrDenotation } from './denotation';

export type SetCustomFormatNameType = Dispatch<SetStateAction<FormatType>>;

export type FunctionsNameOfIconUtilsOfCustomColorType =
  | 'onClickOfGradientButton'
  | 'onClickOfExtendButton'
  | 'onClickOfPalletteButton'
  | 'onClickOfColorPreviewButton'
  | 'onClickOfCopyButton'
  | 'onClickCustomizationButton';

export type FunctionsOfIconUtilsOfCustomColorType = {
  [Property in FunctionsNameOfIconUtilsOfCustomColorType]: () => void;
};

export type IconUtilsOfCustomColorPropsType = {
  statusState: { [key: string]: boolean };
  onSave: (color: string) => void;
  customizationButtonProps: Omit<CustomizationButtonPropsType, 'customColor'>;
  setCustomFormatName: SetCustomFormatNameType;
  customFormatName: FormatType;
  colorInHexFormat: string;

  customColor: CustomColorType;
} & FunctionsOfIconUtilsOfCustomColorType;

export type IconsUtilsArrDenotationOfColorPickerType = $Values<typeof iconsUtilsArrDenotation>;
