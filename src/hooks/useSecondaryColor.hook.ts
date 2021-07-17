import { CustomColorType } from 'models/types';
import { useMix } from './useMix.hook';

export const useSecondaryColor = (customColor: CustomColorType): string => {
  const firstMixedColor = useMix(customColor, 0.8, true);
  const secondMixedColor = useMix(customColor, 0.2, true);

  const secondaryColor = useMix({ ...customColor, hover: firstMixedColor, bgHover: secondMixedColor }, 0.92, true);

  // const secondaryColor =
  // useIsColorLight(color) === useIsColorLight(customColor.bgHover) ? colord(color).invert(0.8).toHex() : color;

  return secondaryColor;
};
