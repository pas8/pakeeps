import { TypographyClassKey } from '@material-ui/core';
import { ClosePopoverOrMenuType, CurrentTargetType, UseStylesCustomColorType } from 'models/types';

export type PopoverLocationType = 'default' | 'left' | 'center' | 'right';
export type MenuLocationType = PopoverLocationType;

export type UseStylesType = UseStylesCustomColorType;

export type PopoverAndMenuType = UseStylesType & {
  isMenuOpen?: boolean;
  handlePopoverClose?: ClosePopoverOrMenuType;
  isPopoverOpen?: boolean;
  handleMenuClose: ClosePopoverOrMenuType;
  currentTarget?: CurrentTargetType;
  popoverText?: string;
  menuComponentsProps?: object;
  MenuComponents?: any;
  reversedColor?: CustomColorType;
  popoverTypographyVariant?: TypographyClassKey | any;
  // menuLocation: any;
  // popoverLocation: any;
};
