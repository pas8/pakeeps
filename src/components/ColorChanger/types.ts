import { CustomColorType } from 'models/types';

export type ColorPickerByPasPropsType = {
  handleSave: (color: string) => void;
  customColor: CustomColorType;
};
