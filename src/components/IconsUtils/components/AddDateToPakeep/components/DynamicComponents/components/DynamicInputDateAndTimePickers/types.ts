import { CustomColorType } from 'models/types';

export type DynamicInputDateAndTimePickersPropsType = {
  icon: any;
  name: string;
  inputValue: string;
  ampm: boolean;
  value: String;
  format: string;
  correctName: string;
  title: string;
  focusedEventId: string;
  handleDateAndTimeInputsState: any;
  onClickOfCloseIcon: () => void;
  handleThemeColorsThunk: any;
  onClickOfEditIcon: () => void;
} & UseStylesOfDynamicInputDateAndTimePickersPropsType;

export type UseStylesOfDynamicInputDateAndTimePickersPropsType = {
  customColor: CustomColorType;
  onlyTime: boolean;
  error?:boolean
  isDark?: boolean;
};
