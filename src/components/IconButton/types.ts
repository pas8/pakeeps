import { IconSizeType } from './../IconsUtils/components/WrapperOfPopoverAndMenu/types';
import { ReactNode, ReactElement, FC } from 'react';
import { CustomColorType } from 'models/types';
import { IconsUtilsArrDenotationNameType } from 'components/IconsUtils/types';
import { IconButtonProps } from '@material-ui/core';
export type IconColorType = string;

export type IconClassType = {
  iconColor?: IconColorType;
  rotate?: string;
  isArctiveIconPresent?: boolean;
  isIconActive?: boolean | any;
  fillOpacity?: number;
};

type IconType = any;

export type IconButtonByPasType = IconButtonProps &
  IconClassType & {
    badgeContent?: number;
    onClick?: any;
    rotateDeg?: number;
    icon: IconType;
    iconName?: any | string;
    activeIconName?: string;
    activeProperty?: boolean;
    size?: IconSizeType;
    customColor?: CustomColorType;
    handleAverageMainComponentWidth?: Function;
  };
