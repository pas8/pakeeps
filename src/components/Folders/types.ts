import { PopoverProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { ColorType, GlobalFolderIdType } from 'store/modules/App/types';

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

export type FolderOpenStatusType = {
  isFolderOpen: boolean;
  isFolderExtended: boolean;
};

export type FoldersTypeProps = {

  handleCloseFoldersWithDrawerView: () => void;
} & DefaultUseStylesOfFoldersType &
  FolderOpenStatusType;

export type MoreMenuOfFoldersPropsType = {
  arrToMap: any[];
  isMoreMenuopen: boolean;
  handleCloseMenu: () => void;
  menuAnchorEl: PopoverProps['anchorEl'];
  flattenAllFolders: any[];
} & DefaultFoldersType;

export type HandleChangeFolderColorType = (color: ColorType) => void;
export type HandleChangeGlobalFolderIdType = (globalFolderId: GlobalFolderIdType) => void;
