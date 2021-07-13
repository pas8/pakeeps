import {
  FolderOpenStatusType,
  HandleChangeFolderColorType,
  HandleChangeGlobalFolderIdType
} from 'components/Folders/types';
import { FolderDimensionsType } from 'models/types';
import { FolderType } from 'store/modules/App/types';

export type USeStylesOfFolderButtonGroupByPasType = {
  folderDimensions: FolderDimensionsType;
  folderColor: string;
} & FolderOpenStatusType;

export type FolderButtonGroupByPasPropsType = {
  folder: FolderType;
  globalFolderId: string;
  handleChangeGlobalFolderId: HandleChangeGlobalFolderIdType;
  handleChangeFolderColor: HandleChangeFolderColorType;
} & USeStylesOfFolderButtonGroupByPasType;
