import { Dispatch, SetStateAction } from 'react';

export type PropetyyyType =
  | 'navigationViewLikeGoogleKeep'
  | 'navigationViewLikeTelegram'
  | 'navigationViewLikePakeeps'
  | 'isMenuOpen'
  | 'isMenuExtended';

export type UseStylesOfHeaderByPasType = {
  [Property in PropetyyyType]: boolean;
};
export type HeaderByPasPropsType = {
  drawerWidth: number;
} & UseStylesOfHeaderByPasType;

export type MainBarPropsType = {
  handleDrawerOpen: () => void;
  isMenuOpen: boolean;
  isMenuExtended: boolean;
};

export type HeaderSearchPropsType = {
  isSeaching: boolean;
  setIsSeaching: Dispatch<SetStateAction<boolean>>;
  isOnlySearchVisible: boolean;
};
