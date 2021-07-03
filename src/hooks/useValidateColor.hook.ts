import { useThemeColors } from './useThemeColors.hook';

export const useValidateColor = (color: string) => {
  const [primary, secondary] = useThemeColors();
  const validatedColor =
    color === 'default' || !color || color === 'primary' ? primary : color === 'secondary' ? secondary : color;

  return validatedColor;
};
