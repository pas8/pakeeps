import { FolderPropetyType, ReturnValueOfUseFindFolderItemPropertyiesType } from './../../../../models/types';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import {
  FolderOpenStatusType,
  HandleChangeFolderColorType,
  HandleChangeGlobalFolderIdType
} from 'components/Folders/types';
import {
  AditionalFoldersHeigthObjType,
  FolderDimensionsType,
  ReturnValueOfUseFindCorrectFolderFuncType
} from 'models/types';
import { FolderAdditionalArrPropertyType, FolderType, PropertyOfElementOfFolderArrType } from 'store/modules/App/types';

export type USeStylesOfFolderButtonGroupByPasType = {
  folderDimensions: FolderDimensionsType;
  folderColor: string;
  isButtonIsOpenMore?: boolean;
} & FolderOpenStatusType;

export type DefaultUseFindCorrectFolderFuncPropsType = {
  handleChangeGlobalFolderId: HandleChangeGlobalFolderIdType;
  handleChangeFolderColor: HandleChangeFolderColorType;
};
export type SetAditionalFoldersHeigthObjType = Dispatch<SetStateAction<AditionalFoldersHeigthObjType>>;

export type UseStateOfAditionalFoldersHeigthObj = {
  setAditionalFoldersHeigthObj: SetAditionalFoldersHeigthObjType;
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

export type FolderItemPropsType = {
  folderDimensions: FolderDimensionsType;
  isFoldersHaveDraweView: boolean;
  isFolderExtended: boolean;
  isAdditionalButtonsVisible: boolean;
  icon: any;
  isButtonIsOpenMore:boolean
  title: string;
  id: string;
  additionalMenuState: any;
  label: string;
  property: PropertyOfElementOfFolderArrType;

  isAdditionalArrowButtonVisible: boolean;
} & ReturnValueOfUseFindCorrectFolderFuncType &
  ReturnValueOfUseFindFolderItemPropertyiesType & UseStateOfAditionalFoldersHeigthObj
