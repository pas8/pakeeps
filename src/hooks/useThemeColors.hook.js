import { useTheme } from '@material-ui/core';
import { useState, useEffect } from 'react';

export const useThemeColors = () => {
  const [colors, setColors] = useState(Array(4).fill(''));
  const { palette } = useTheme();

  const { primary, secondary, maxEmphasis, highEmphasis, mediumEmphasis } = palette;
  const colorArr = [primary?.main, secondary?.main, maxEmphasis?.main, highEmphasis?.main, mediumEmphasis?.main];

  useEffect(() => setColors(colorArr), [palette]);
  return colors;
};
