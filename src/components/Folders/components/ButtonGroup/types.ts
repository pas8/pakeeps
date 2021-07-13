import { Dispatch, MouseEvent, SetStateAction } from 'react';
import {
  FolderOpenStatusType,
  HandleChangeFolderColorType,
  HandleChangeGlobalFolderIdType
} from 'components/Folders/types';
import { AditionalFoldersHeigthObjType, FolderDimensionsType } from 'models/types';
import { FolderAdditionalArrPropertyType, FolderType } from 'store/modules/App/types';

export type USeStylesOfFolderButtonGroupByPasType = {
  folderDimensions: FolderDimensionsType;
  folderColor: string;
} & FolderOpenStatusType;

export type DefaultUseFindCorrectFolderFuncPropsType = {
  handleChangeGlobalFolderId: HandleChangeGlobalFolderIdType;
  handleChangeFolderColor: HandleChangeFolderColorType;
};
export type UseStateOfAditionalFoldersHeigthObj = {
  setAditionalFoldersHeigthObj: Dispatch<SetStateAction<AditionalFoldersHeigthObjType>>;
  aditionalFoldersHeigthObj: AditionalFoldersHeigthObjType;
};

export type FolderButtonGroupByPasPropsType = {
  folder: FolderType;
  globalFolderId: string;
} & USeStylesOfFolderButtonGroupByPasType & 
  UseStateOfAditionalFoldersHeigthObj &
  DefaultUseFindCorrectFolderFuncPropsType;

export type HandelOpenAdditionalMenuType = (id: string) => void;
