import { CoordinatesType } from 'store/modules/App/types';
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
  isMenuOpen: boolean;
  isMenuExtended: boolean;
  isRouteIsAuth: boolean;
};

export type HeaderSearchPropsType = {
  isSeaching: boolean;
  setIsSeaching: Dispatch<SetStateAction<boolean>>;
  isOnlySearchVisible: boolean;
};

export type SearchDataType = {
  [key: string]: {
    [key: string]: any;
  };
};

export type UseStylesOfHeaderSearchType = {
  [Property in 'isSeaching' | 'isQueryEmpty' | 'isHeaderHavePaperColor' | 'isOnlySearchVisible']: boolean;
};

export type SearchGroupContainerWithTitlePropsType = {
  title: string;
  isListHidden: boolean;
  setIsListHidden: Dispatch<SetStateAction<boolean>>;
};

export type DefaultSearchGroupPropsType = { title: any;  defaultFunc: () => void };

export type HeaderMenuArrItemType = {
  text: string;
  customIconComponent?: any;
  onClick: (e: any) => void;
  iconName?: string;
  id: string;
};

export type HeaderMenuContainerPropsType = {
  onClose: (e: any) => void;
  componentWhenArrIsEmpty?: any;
  coordinates: { top: number; left: number };
  arr: HeaderMenuArrItemType[];
};
