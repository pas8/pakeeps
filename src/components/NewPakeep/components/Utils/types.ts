import { IconsUtilsPropsType } from 'components/IconsUtils/types';
import { CustomColorType } from 'models/types';

export type NewPakeepUtilsType = {
  customColor: CustomColorType;
  onSave: () => void;
  onClose:()=> void
  widthOfContainer: number;
} & IconsUtilsPropsType
