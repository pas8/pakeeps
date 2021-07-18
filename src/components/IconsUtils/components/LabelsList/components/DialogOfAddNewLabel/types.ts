import { CustomColorType } from 'models/types';
import { ChangeEvent, ReactNode } from 'react';
import { ILabelElement } from 'store/modules/App/types';

export type UseStylesOfDialogOfAddNewLabelProps = {
  customColor: CustomColorType;
};

export type DialogOfAddNewLabelPropsType = {
  isDialogOpen: boolean;
  handleCloseAddNewLabelDialog: () => void;
  handleOpenAddNewLabelDialog: () => void;
} & UseStylesOfDialogOfAddNewLabelProps;

export type HandleAddNewGlobalLabelType = (newLabel: ILabelElement) => void;

export type NewLabelStateType = ILabelElement;

export type StepOfDialogOfAddNewLabelType = {
  title: string;
  Component: any;
  isAdditionalComponentHidden?: boolean;
  AdditionalComponent?: any;
  additionalComponentProps?: object;
  componentProps: object;
};

export type OnChangeOfLabelColorRadioType = (e: ChangeEvent<HTMLInputElement>) => void;
