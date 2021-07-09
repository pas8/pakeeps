import { UseStylesCustomColorType } from 'models/types';

export type UseStylesOfDialogOfAddingNewGlobalEventType = UseStylesCustomColorType & {};

export type DialogOfAddingNewGlobalEventPropsType = {
  open: boolean;
  onClose:()=> void
  handleOpenDialog:()=> void
} & UseStylesCustomColorType;
