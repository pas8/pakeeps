import { AvatarPropertiesType } from 'store/modules/App/types';
export type AccountAvatarPropsType = {
  isAccountHaveAvatar: boolean;
  handleOpenDialog: () => void;
  getInputProps: any;
  handleDropZoneOpen: any;
  isHaveBgColor:boolean
} & AvatarPropertiesType;
