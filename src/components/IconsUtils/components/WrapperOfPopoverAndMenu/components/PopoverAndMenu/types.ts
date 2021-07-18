import { TypographyClassKey } from '@material-ui/core';
import { ClosePopoverOrMenuType, CurrentTargetType, CustomColorType, UseStylesCustomColorType } from 'models/types';

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
  cordinates?: { top: number; left: number };
  reversedColor?: CustomColorType;
  popoverTypographyVariant?: TypographyClassKey | any;
  // menuLocation: any;
  // popoverLocation: any;
};
