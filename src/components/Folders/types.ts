import { MenuProps, PopoverProps } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { ColorType, FolderOrderNamesValueType, FoldersType, FolderType, GlobalFolderIdType } from 'store/modules/App/types';
import { DefaultUseFindCorrectFolderFuncPropsType } from './components/ButtonGroup/types';

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

export type MenuCordinatsType = { top: number; left: number };

export type MoreMenuOfFoldersPropsType = {
  onClose: MenuProps['onClose'];
  foldersAfter: FoldersType;
  folderOrderNames:FolderOrderNamesValueType
} & DefaultFoldersType &
  DefaultUseFindCorrectFolderFuncPropsType &
  MenuCordinatsType;

export type HandleChangeFolderColorType = (color: ColorType) => void;
export type HandleChangeGlobalFolderIdType = (globalFolderId: GlobalFolderIdType) => void;
