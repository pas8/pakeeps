import { useMix } from './useMix.hook';

export const useSecondaryColor = customColor => {
  const firstMixedColor = useMix(customColor, 0.8, true);
  const secondMixedColor = useMix(customColor, 0.2, true);

  const secondaryColor = useMix({ hover: firstMixedColor, bgHover: secondMixedColor }, 0.8, true);

  return secondaryColor;
};
