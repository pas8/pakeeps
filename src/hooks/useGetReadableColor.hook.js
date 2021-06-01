import { colord } from 'colord';
import { useEffect, useState } from 'react';
import { useIsColorDark } from './useIsColorDark.hook';

export const useGetReadableColor = (backgroundColor, color = 'default') => {
  const [colorState, setColorState] = useState([false, { hover: '', unHover: '' }, false]);
  const defaultColors = { backgroundColor: '#303030', color: '#ffffff' };
  const isUseDefaultBackgroundColor = backgroundColor === 'default';
  const isUseDefaultColor = color === 'default';

  const defaultBlackColor = '#000';

  const isUseDefault = isUseDefaultColor && isUseDefaultBackgroundColor;

  const isBackroundColorDark = useIsColorDark(
    isUseDefaultBackgroundColor ? defaultColors.backgroundColor : backgroundColor
  );
  const isColorWhite = !useIsColorDark(isUseDefaultColor ? defaultColors.color : color);

  const isValid = isBackroundColorDark === isColorWhite;

  const bgUnHover = !useIsColorDark(backgroundColor)
    ? colord(backgroundColor).darken(0.08).toHex()
    : colord(backgroundColor).lighten(0.08).toHex();

  const bgHover = !useIsColorDark(backgroundColor)
    ? colord(backgroundColor).darken(0.4).lighten(0.08).alpha(0.8).toHex()
    : colord(backgroundColor).lighten(0.4).darken(0.08).alpha(0.8).toHex();

  const newColor = !isUseDefaultColor
    ? { hover: color, unHover: colord(color).alpha(0.8).toHex(), bgHover, bgUnHover ,isUseDefault:false}
    : isValid || isUseDefault
    ? {
        hover: defaultColors.color,
        unHover: colord(defaultColors.color).alpha(0.8).toHex(),
        bgHover,
        bgUnHover,
        isUseDefault:false
      }
    : {
        hover: defaultBlackColor,
        unHover: colord(defaultColors.backgroundColor).alpha(0.96).toHex(),
        bgHover,
        bgUnHover,
        isUseDefault:true
      };

  const customColor = isUseDefault ? false : newColor;

  useEffect(() => {
    setColorState([customColor, isUseDefaultBackgroundColor, isUseDefaultColor]);
  }, [backgroundColor, color]);

  return [...colorState];
};
