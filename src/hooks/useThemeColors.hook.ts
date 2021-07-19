import { useTheme } from '@material-ui/core';
import { useState, useEffect } from 'react';

export const useThemeColors = () => {
  const [colors, setColors] = useState<(string | undefined)[]>(Array(4).fill(''));
  const { palette } = useTheme();

  const { primary, secondary, text } = palette;
  const colorArr = [primary.main, secondary.main, text.primary, text.secondary, text.hint];

  useEffect(() => {
    setColors(colorArr);
  }, [palette]);
  return colors;
};
