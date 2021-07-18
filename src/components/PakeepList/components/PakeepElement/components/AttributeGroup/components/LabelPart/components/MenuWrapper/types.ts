import { ClosePopoverOrMenuType, CustomColorType, UseStylesCustomColorType } from 'models/types';
import { Dispatch } from 'react';
import { CoordinatesType, DefaultMenuPropsType, ILabelElement } from 'store/modules/App/types';

export type WrapperOfMenuOfLabelPartPropsType = { id: string ,onClose:()=> void} & CoordinatesType & UseStylesCustomColorType;

export type HandleChangeLabelColorType = (color: string) => void;
export type HandleChangeLabelTitleType = ({ target: { value } }: { target: { value: string } }) => void;
export type HandleChangeLabelIconNameType = (labelIconName: string) => void;

export type MenuStateOfChangingLabelMenuType = {} & CoordinatesType & ILabelElement;
