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
export type FoldersTypeProps = {
  value: number;
  handleChange: HandleChangeOfFolders;
  handleDrawerWidth: (drawerWidth: number) => void;
  isFolderOpen: boolean;
  handleCloseFoldersWithDrawerView: () => void;
  handleHideFolder: () => void;
  setMargin: Dispatch<SetStateAction<number>>;
  isSizeOfFoldersMoreThanSize: boolean;
  setIsSizeOfFoldersMoreThanSize: Dispatch<SetStateAction<boolean>>;
} & DefaultUseStylesOfFoldersType;
