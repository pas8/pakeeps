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
  isSmallSize: boolean;
  isMenuExtended: boolean;
};
