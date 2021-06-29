import { Dispatch, SetStateAction } from 'react';


export type SetEditorType = Dispatch<SetStateAction<any>>
export type SetAvatarEditorState = Dispatch<SetStateAction<AvatarEditorStateType>>

export type DialogOfEditingAvatarPropsType = {
  image: any;
  isDialogOpen: boolean,
  setIsDialogOpen: any
};

export type AvatarEditorStateType = {
  image: any;
  position: {
    x: number;
    y: number;
  };
  scale: number;
  rotate: number;
  borderRadius: number;
  width: number;
  height: number;
  disableCanvasRotation: boolean;
  isTransparent: boolean;
  backgroundColor: string;
};
