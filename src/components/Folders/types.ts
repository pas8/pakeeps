import { PopoverProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';

export type DefaultUseStylesOfFoldersType = {
  isMenuOpen: boolean;
  positionOfFolderViewWithPakeepViewIsBottom: boolean;
  positionOfFolderViewWithPakeepViewIsRight: boolean;
  isFolderViewWithPakeepViewAlignToCenter: boolean;
  isFoldersHaveDraweView: boolean;
};

export type UseStylesOfFoldersType = { folderColor: string; headerHeight: number } & DefaultUseStylesOfFoldersType;

export type HandleChangeOfFolders = (__: any, idx: any) => void;

export type DefaultFoldersType = {
  handleChange: HandleChangeOfFolders;
  value: number;
};

export type FoldersTypeProps = {
  handleDrawerWidth: (drawerWidth: number) => void;
  isFolderOpen: boolean;
  handleCloseFoldersWithDrawerView: () => void;
  handleHideFolder: () => void;
  setMargin: Dispatch<SetStateAction<number>>;
  isSizeOfFoldersMoreThanSize: boolean;
  setIsSizeOfFoldersMoreThanSize: Dispatch<SetStateAction<boolean>>;
} & DefaultUseStylesOfFoldersType &
  DefaultFoldersType;

export type MoreMenuOfFoldersPropsType = {
  arrToMap: any[];
  isMoreMenuopen: boolean;
  handleCloseMenu: () => void;
  menuAnchorEl: PopoverProps['anchorEl'];
  flattenAllFolders: any[];
} & DefaultFoldersType;
