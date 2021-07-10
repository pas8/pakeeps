import { CustomColorType } from 'models/types';

export type PreparedIconSelectingListPropsType = {
  icon: any;
  iconName: string;
  selectedIconName: string;
  color?: string;
  onClick: () => void;
  customColor: CustomColorType;
  isDragging?: boolean;
  checkedIcon: any;
};
