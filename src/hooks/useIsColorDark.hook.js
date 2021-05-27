import { colord } from 'colord';

export const useIsColorDark = color => {
  const isDark = colord(color).brightness() >= 0.48;

  return isDark;
};
