import { PopoverProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { GlobalFolderIdType } from 'store/modules/App/types';

export type DefaultUseStylesOfFoldersType = {
  positionOfFolderViewWithPakeepViewIsBottom: boolean;
  positionOfFolderViewWithPakeepViewIsRight: boolean;
  isFolderViewWithPakeepViewAlignToCenter: boolean;
  isFoldersHaveDraweView: boolean;
};

export type UseStylesOfFoldersType = { folderColor: string; headerHeight: number } & DefaultUseStylesOfFoldersType;

export type HandleChangeOfFolders = (id: GlobalFolderIdType) => void;

export type DefaultFoldersType = {
  handleChangeGlobalFolderId: HandleChangeOfFolders;
  globalFolderId: GlobalFolderIdType;
};

export type FoldersTypeProps = {
  handleDrawerWidth: (drawerWidth: number) => void;
  isFolderOpen: boolean;
  isFolderExtended: boolean;
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
