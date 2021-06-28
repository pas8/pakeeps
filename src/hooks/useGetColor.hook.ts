import { colord } from 'colord';
import { CustomColorType } from 'models/types';
import { useIsColorDark } from './useIsColorDark.hook';
import { useMix } from './useMix.hook';
import { useSecondaryColor } from './useSecondaryColor.hook';

interface DefaultColors {
  backgroundColor: string;
  color: string;
}

export const useGetColor = (backgroundColor: string, color: string = 'default'): any => {
  const defaultColors: DefaultColors = { backgroundColor: '#303030', color: '#ffffff' };
  const isUseDefaultBackgroundColor: boolean = backgroundColor === 'default';
  const isUseDefaultColor: boolean = color === 'default';

  const defaultBlackColor = '#000';

  const isUseDefault = isUseDefaultColor && isUseDefaultBackgroundColor;

  const isBackroundColorDark = useIsColorDark(
    isUseDefaultBackgroundColor ? defaultColors.backgroundColor : backgroundColor
  );
  const isColorWhite = !useIsColorDark(isUseDefaultColor ? defaultColors.color : color);

  const isValid: boolean = isBackroundColorDark === isColorWhite;

  const bgUnHover: string = !useIsColorDark(backgroundColor)
    ? colord(backgroundColor).darken(0.08).toHex()
    : colord(backgroundColor).lighten(0.08).toHex();

  const bgHover: string = !useIsColorDark(backgroundColor)
    ? colord(backgroundColor).darken(0.4).lighten(0.08).alpha(0.8).toHex()
    : colord(backgroundColor).lighten(0.4).darken(0.08).alpha(0.8).toHex();

  const newColor: { hover: string; bgHover: string; unHover: string; bgUnHover: string } = !isUseDefaultColor
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

  const secondaryColor: string = useSecondaryColor(newColor);

  const newColorWithSecondaryColor:CustomColorType = { ...newColor, secondaryColor, isUseDefault };

  return [newColorWithSecondaryColor, isUseDefaultBackgroundColor, isUseDefaultColor];
};