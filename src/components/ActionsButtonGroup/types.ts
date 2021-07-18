import { Optional } from 'utility-types';
import { MouseEventHandler } from 'react';

export type UseStylesOfCloseButtonWithIconType = { colorOfCloseButton: string };
export type CloseButtonWithIconPropsType = UseStylesOfCloseButtonWithIconType & {
  onClose: (e: any) => void;
};

export type UseStylesOfSaveButtonWithIconType = { colorOfSaveButton: string };
export type SaveButtonWithIconPropsType = UseStylesOfSaveButtonWithIconType & {
  onSave: (e: any) => void;
};

export type ActionsButtonGroupPropsType = Optional<SaveButtonWithIconPropsType, 'colorOfSaveButton'> &
  Optional<CloseButtonWithIconPropsType, 'colorOfCloseButton'>;
