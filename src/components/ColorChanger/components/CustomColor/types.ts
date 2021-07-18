import { ColorPickerByPasPropsType } from 'components/ColorChanger/types';

export type CustomColorPropsType = {
  gradientStatus: boolean;
  setGradientStatus: any;
} & ColorPickerByPasPropsType;

export type UseStylesOfCustomColorType = {
  isExtended: boolean;
  isCustomColor: boolean;
};
