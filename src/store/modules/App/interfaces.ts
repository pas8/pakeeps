type ColorType = 'default' | string;
export type LabelVariantType = 'default' | 'outlined';
export type IconNameType = string;
export type TitleType = string;

export type FoldersType = any[][];


export interface GlobalEventInteface {
  title: TitleType;
  iconName: IconNameType;
  id: string;
  value: number | Date;
  onlyTime?: boolean;
  color: string;
}

export interface BreakpointsValuesInterface<T> {
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}

export interface DefaultFolderElementInterface {
  title: TitleType;
  iconName: string;
  id: string;
  property: string;
}


  export interface PakeepEventInteface {
  id: string;
  value: number | Date;
}

export interface PakeepElementInterface {
  title: TitleType;
  text: string;
  isInBookmark: boolean;
  isFavorite: boolean;
  color: ColorType;
  labels: string[];
  isArchived: boolean;
  events: GlobalEventInteface[];
  id: string;
  isPinned: boolean;
  isCheckBoxes: boolean;
  backgroundColor: ColorType;
}

export interface LabelElementInterface {
  color: ColorType;
  title: string;
  iconName: IconNameType;
  id: string;
  variant: LabelVariantType;
}

export interface DefaultThemeInterface {
  primaryMain: string;
  paperMain: string;
  defaultBackgroundMain: string;
  secondaryMain: string;
  type: string;
  highEmphasis: string;
  mediumEmphasis: string;
  maxEmphasis: string;
}

export type OrderNameType = string

export interface InitialStateInteface {
  breakpointsValues: BreakpointsValuesInterface<number>;
  theme: DefaultThemeInterface;
  defaultFolderArr: DefaultFolderElementInterface[];

  labels: LabelElementInterface[];
  events: GlobalEventInteface[];
  selectedPakeepsId: string[];
  folders:FoldersType;

  pakeeps: PakeepElementInterface[];
  pakeepsOrderNames: OrderNameType[];
  pinnedPakeepsOrderNames: OrderNameType[];
  notifinationCounter: number;
  isMenuOpen: boolean;
  currentFolderPropertyIdx: number;
  drawerWidth: number | string;
  isCancelSelectedPakeepsId: boolean;
}
