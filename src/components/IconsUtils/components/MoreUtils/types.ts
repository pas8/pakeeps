import { IconsUtilsArrType } from 'components/IconsUtils/types';
import { CustomColorType, IconType } from 'models/types';

export type UseStylesOfMoreUtilsType = {
  color: string;
  hoverColor: string;
};

export type MoreUtilsPropsType = {
  slicedArrAfter: IconsUtilsArrType
  customColor: CustomColorType;
};
