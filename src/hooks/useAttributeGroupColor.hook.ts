import { UseAttributeGroupColorType } from 'models/types';
import { useState, useEffect } from 'react';
import { useIsColorLight } from './useIsColorLight.hook';
import { useThemeColors } from './useThemeColors.hook';

export const defaultLabelColor = '#969696';

export const useAttributeGroupColor: UseAttributeGroupColorType = (customColor, currentColor) => {
  // const [color, setColor] = useState(false);
  const [primaryColor, secondaryColor] = useThemeColors();

  const isDark = useIsColorLight(currentColor);

  const isCustomColor = !customColor.isUseDefault;

  // useEffect(() => {
  const newColor = isCustomColor
    ? customColor?.hover
    : !currentColor
    ? defaultLabelColor
    : currentColor === 'primary'
    ? primaryColor
    : currentColor === 'secondary'
    ? secondaryColor
    : currentColor;

  // setColor(newColor);
  // }, [customColor, currentColor]);

  return [newColor!, isCustomColor, isDark];
};
