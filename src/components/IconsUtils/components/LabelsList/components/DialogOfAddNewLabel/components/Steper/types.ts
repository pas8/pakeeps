import { CustomColorType } from 'models/types';
import { OnChangeOfLabelColorRadioType, StepOfDialogOfAddNewLabelType } from '../../types';

export type UseStylesOfSteperOfDialogOfAddNewLabelType = {
  customColor: CustomColorType;
};

export type SteperOfDialogOfAddNewLabelPropsType = {
  toNullityNewLabelState: () => void;
  stepsArrOfDialogOfAddNewLabel: StepOfDialogOfAddNewLabelType[];
} & UseStylesOfSteperOfDialogOfAddNewLabelType;

export type ThirdStepOfSteperOfDialogOfAddNewLabelPropsType = {
  value: string;
  onChange: OnChangeOfLabelColorRadioType;
  colorVariants: { labelText: string; value: string }[];
};
