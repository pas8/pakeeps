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
  isButtonIsOpenMore?: boolean;
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
  isFoldersHaveDraweView: boolean;
} & USeStylesOfFolderButtonGroupByPasType &
  UseStateOfAditionalFoldersHeigthObj &
  DefaultUseFindCorrectFolderFuncPropsType;

export type HandelOpenAdditionalMenuType = (param: { id: string; arrLength: number }) => void;
