import { DropzoneOptions } from 'react-dropzone';
import { AvatarPropertiesType } from 'store/modules/App/types';
export type AccountAvatarPropsType = {
  isAccountHaveAvatar: boolean;
  handleOpenDialog: () => void;
  getInputProps: any;
  isHaveBgColor: boolean;
  isDragActive: boolean;
  onClose: () => void;
  anchorEl: any;
} & AvatarPropertiesType;
