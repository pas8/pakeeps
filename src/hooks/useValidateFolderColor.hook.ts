import { useTheme } from '@material-ui/core';
import { DEFAULT, PRIMARY, SECONDARY } from 'models/denotation';
import { UseValidateFolderColorType } from 'models/types';

export const useValidateFolderColor: UseValidateFolderColorType = folderColor => {
  const theme = useTheme();

  const validatedFolderColor =
    folderColor === DEFAULT || !folderColor || folderColor === PRIMARY
      ? theme.palette.primary.main
      : folderColor === SECONDARY
      ? theme.palette.secondary.main
      : folderColor;

  return validatedFolderColor;
};
