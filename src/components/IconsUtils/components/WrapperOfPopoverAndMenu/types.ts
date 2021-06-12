import { IconsUtilsArrType } from 'components/IconsUtils/types';
import { CustomColorType } from 'hooks/useGetReadableColor.hook';

export type IconSizeType = 'default' | 'small';

export type WrapperOfPopoverAndMenuType = {
  buttonUtilsArr: IconsUtilsArrType;
  keyName?: string;
  isIconNameExtended?: boolean;
  iconSize?: IconSizeType;
  handleAverageMainComponentWidth?: Function;
  customColor?: CustomColorType;
  isCustomColorReversed?: boolean;
};
