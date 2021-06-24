import { Dispatch, SetStateAction } from 'react';

export type UseStylesOfFoldersType = {
  [key: string]: boolean;
};

export type HandleChangeOfFolders = (__: any, idx: any) => void;
export type FoldersTypeProps = {
  value: number;
  handleChange: HandleChangeOfFolders;
  handleDrawerWidth: (drawerWidth: number) => void;
  isMenuOpen: boolean;
  positionOfFolderViewWithPakeepViewIsBottom: boolean;
  positionOfFolderViewWithPakeepViewIsRight: boolean;
  isFolderOpen: boolean;
  handleHideFolder: () => void;
  isFolderViewWithPakeepViewAlignToCenter: boolean;
  setMargin: Dispatch<SetStateAction<number>>;
  isSizeOfFoldersMoreThanSize: boolean;
  setIsSizeOfFoldersMoreThanSize: Dispatch<SetStateAction<boolean>>;
};
