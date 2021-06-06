import { useState, useEffect } from 'react';
import { useIsColorDark } from './useIsColorDark.hook';
import { useThemeColors } from './useThemeColors.hook';

export const useAttributeGroupColor = (customColor, currentColor) => {
  // const [color, setColor] = useState(false);
  const [primaryColor, secondaryColor] = useThemeColors();

  const isDark = useIsColorDark(currentColor);


  const isCustomColor = !!customColor;
  const defaultColor = '#969696';

  // useEffect(() => {
    const newColor = isCustomColor
      ? customColor?.hover
      : !currentColor
      ? defaultColor
      : currentColor === 'primary'
      ? primaryColor
      : currentColor === 'secondary'
      ? secondaryColor
      : currentColor;

    // setColor(newColor);
  // }, [customColor, currentColor]);

  return [newColor,isCustomColor,isDark]
};
