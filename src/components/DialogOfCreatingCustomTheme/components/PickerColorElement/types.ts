import { RgbaColor } from 'colord';
import { dialogColorNames } from 'components/DialogOfCreatingCustomTheme';

export type PickerColorElementPropsType = {
  name: string;
  setColor: (color: string) => void;
  color: RgbaColor;
  isSelected: boolean;
  onClick: () => void;
  colorFormat: string;
};

export type ColorStateType = { [Propery in dialogColorNames]: string };
