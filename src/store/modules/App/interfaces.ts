import { $Keys, $Values, Brand } from 'utility-types';

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

// export type PakeepIdType = Brand<string, '_pakeepId'>;
export type PakeepIdType = string;

export interface PakeepElementInterface {
  title: TitleType;
  text: string;
  isInBookmark: boolean;
  isFavorite: boolean;
  color: ColorType;
  labels: string[];
  isArchived: boolean;
  events: GlobalEventInteface[];
  readonly id: PakeepIdType;
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
export type GlobalLabelsType = LabelElementInterface[];
export type GlobalEventsType = GlobalEventInteface[];

export interface DefaultThemeInterface {
  primaryMain?: string;
  paperMain?: string;
  defaultBackgroundMain?: string;
  secondaryMain?: string;
  type?: string;
  highEmphasis?: string;
  mediumEmphasis?: string;
  maxEmphasis?: string;
}

export type OrderNameType = string;
export type OrderNamesType = OrderNameType[];
export type DrawerWidthType = number | string;
export type PakeepsType = PakeepElementInterface[];
export type SelectedPakeepsIdType = string[];

export interface InitialStateInteface {
  // breakpointsValues: BreakpointsValuesInterface<number>;
  // theme: DefaultThemeInterface;
  defaultFolderArr: DefaultFolderElementInterface[];
  labels: GlobalLabelsType;
  events: GlobalEventsType;
  selectedPakeepsId: SelectedPakeepsIdType;
  folders: FoldersType;
  pakeeps: PakeepsType;
  pakeepsOrderNames: OrderNamesType;
  pinnedPakeepsOrderNames: OrderNamesType;
  notifinationCounter: number;
  isMenuOpen: boolean;
  currentFolderPropertyIdx: number;
  drawerWidth: DrawerWidthType;
  isCancelSelectedPakeepsId: boolean;
}

export type PakeepPropertyValueType = $Values<PakeepElementInterface>;
export type PakeepPropertyKeysType = $Keys<PakeepElementInterface>;

export type PakeepPropertyType = { [key: string]: PakeepElementInterface };
