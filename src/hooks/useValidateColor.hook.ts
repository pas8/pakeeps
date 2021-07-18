import { useTheme } from '@material-ui/core';
import { DEFAULT, PRIMARY, SECONDARY } from 'models/denotation';

export const useValidateColor = (color: string) => {
  const {palette:{primary,secondary}} = useTheme()

  const validatedColor =
    color === DEFAULT || !color || color === PRIMARY ? primary.main : color === SECONDARY ? secondary.main : color;

  return validatedColor;
};
