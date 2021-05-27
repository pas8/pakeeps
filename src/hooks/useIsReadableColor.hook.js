import { colord } from 'colord';
import { useIsColorDark } from './useIsColorDark.hook';

export const useIsReadableColor = (backgroundColor, color) => {
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
console.log( isValid  || isUseDefault)
  const newColor =
    isValid  || isUseDefault
      ? { hover: defaultColors.color, unHover: colord(defaultColors.color).alpha(0.8).toHex() }
      : { hover: defaultBlackColor, unHover: colord( defaultColors.backgroundColor ).alpha(0.96).toHex() };

  return [isUseDefault,newColor];
};
