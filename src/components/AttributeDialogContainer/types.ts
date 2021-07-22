import { UseStylesCustomColorType } from './../../models/types';
import { SteperOfDialogOfAddNewLabelPropsType } from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/types';
import { ParamOfUseCloseDialogWithRestoreType } from 'models/types';
import { ReactNode } from 'react';

export type AttributeDialogContainerPropsType = {
  previewComponent: ReactNode;
  steperProps: SteperOfDialogOfAddNewLabelPropsType;
  onSave: () => void;
  title: string;
  colorOfSaveButton: string;
  colorOfCloseButton: string;
} & ParamOfUseCloseDialogWithRestoreType<any> &
  UseStylesCustomColorType;
