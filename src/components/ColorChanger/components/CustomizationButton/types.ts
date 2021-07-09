import { CustomColorType } from 'models/types';

export type UseStylesOfCustomizationButton = {
  nullityColor: any;
  colorInHexFormat: string;
  color: any;
  customColor: CustomColorType;
};

export type CustomizationButtonPropsType = {
  setCustomizationsStatusIsTrue: () => void;
  setCustomizationsStatusIsFalse: () => void;
} & UseStylesOfCustomizationButton
