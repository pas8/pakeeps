import { DefaultThemeType } from 'store/modules/Color/types';

export type DialogOfCreatingCustomThemePropsType = {
  isOpen: boolean;
  onClose: () => void;
  theme: DefaultThemeType;
};
