import { PRIMARY, SECONDARY } from 'models/denotation';
import { UseAttributeGroupColorType } from 'models/types';
import { useIsColorLight } from './useIsColorLight.hook';
import { useThemeColors } from './useThemeColors.hook';


export const useAttributeGroupColor: UseAttributeGroupColorType = (customColor, currentColor) => {
  const [primaryColor, secondaryColor,,defaultLabelColor] = useThemeColors();
  const isDark = useIsColorLight(currentColor);
  const isCustomColor = !customColor.isUseDefault;

  const newColor = isCustomColor
    ? customColor?.hover
    : !currentColor
    ? defaultLabelColor
    : currentColor === PRIMARY
    ? primaryColor
    : currentColor === SECONDARY
    ? secondaryColor
    : currentColor;

  return [newColor!, isCustomColor, isDark];
};
