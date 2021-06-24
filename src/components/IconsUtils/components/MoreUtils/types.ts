import { CustomColorType, IconType } from 'models/types';

export type UseStylesOfMoreUtilsType = {
  color: string;
  hoverColor: string;
};

export type MoreUtilsPropsType = {
  slicedArrAfter: {
    popoverText: string;
    icon: IconType;
    isIconActive?: boolean;
    onClick: () => void;
    ActiveIcon: IconType;
  }[];
  customColor: CustomColorType;
};
