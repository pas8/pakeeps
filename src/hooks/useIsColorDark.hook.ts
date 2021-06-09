import { colord } from 'colord';

export const useIsColorDark = (color: string) => {
  const isDark: boolean = colord(color).brightness() >= 0.48;

  return isDark;
};
