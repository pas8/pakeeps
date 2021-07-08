import { colord } from 'colord';
import { useIsColorLight } from './useIsColorLight.hook';
import { useMix } from './useMix.hook';

export const useSecondaryColor = customColor => {
  const firstMixedColor = useMix(customColor, 0.8, true);
  const secondMixedColor = useMix(customColor, 0.2, true);

  const secondaryColor = useMix({ hover: firstMixedColor, bgHover: secondMixedColor }, 0.92, true);

  // const secondaryColor =
    // useIsColorLight(color) === useIsColorLight(customColor.bgHover) ? colord(color).invert(0.8).toHex() : color;

  return secondaryColor;
};
