import { IconsUtilsPropsType } from 'components/IconsUtils/types';

export type EditingDialogOfPakeepElementProps = {
  id: string;
  onClose: () => void;
};

export type OnChangeTargetType = {
  target: { name: string; value: string };
};

export type onChangeType = (target: OnChangeTargetType) => void;

export type InputProps = {
  placeholder: string;
  autoComplete: string;
  onChange: onChangeType;
  fullWidth: boolean;
  name: string;
  autoFocus?: boolean;
  value: string;
  multiline?: boolean;
};

type StringOrBoolean = string | boolean;

export interface StateInteface {
  title: string;
  text: string;
}

export interface UseStylesInteface {
  backgroundColor: string;
isUseEditingDialogAsNewPakeep: boolean;
  color: string;
}

export interface IconsUtilsProps {
  widthOfContainer: number;
  arrOfButtonNamesWhichSholudBeHidden: [string];
}
