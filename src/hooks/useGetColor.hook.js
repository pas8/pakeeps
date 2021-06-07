import { colord } from 'colord';
import { useIsColorDark } from './useIsColorDark.hook';
import { useMix } from './useMix.hook';
import { useSecondaryColor } from './useSecondaryColor.hook';

export const useGetColor = (backgroundColor, color = 'default') => {
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
    ? { hover: color, unHover: colord(color).alpha(0.8).toHex(), bgHover, bgUnHover }
    : isValid || isUseDefault
    ? {
        hover: defaultColors.color,
        unHover: colord(defaultColors.color).alpha(0.8).toHex(),
        bgHover,
        bgUnHover
      }
    : {
        hover: defaultBlackColor,
        unHover: colord(defaultColors.backgroundColor).alpha(0.96).toHex(),
        bgHover,
        bgUnHover
      };
      
  const secondaryColor = useSecondaryColor(newColor);

  const newColorWithSecondaryColor = { ...newColor, secondaryColor };

  const customColor = isUseDefault ? false : newColorWithSecondaryColor;

  return [customColor, isUseDefaultBackgroundColor, isUseDefaultColor];
};
