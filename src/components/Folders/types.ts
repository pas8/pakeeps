import { PopoverProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { GlobalFolderIdType } from 'store/modules/App/types';

export type DefaultUseStylesOfFoldersType = {
  isFoldersHaveDraweView: boolean;
  positionsOfFolder: {
    [Property in 'isBottom' | 'isRight' | 'isLeft']: boolean;
  };
};

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
} & DefaultUseStylesOfFoldersType;

export type MoreMenuOfFoldersPropsType = {
  arrToMap: any[];
  isMoreMenuopen: boolean;
  handleCloseMenu: () => void;
  menuAnchorEl: PopoverProps['anchorEl'];
  flattenAllFolders: any[];
} & DefaultFoldersType;
