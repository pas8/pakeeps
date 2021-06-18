import { IconsUtilsPropsType } from "components/IconsUtils/types";

interface attributeGroupProps {
  handleDeleteLabelFromPakeepFunc:  any; //func
  parentBackgrounColor: string;
  handleDeleteNewLabel: void;
  customColor: any;
  labels: any[];
  pakeepId: boolean;
  globalEvents: any[];
  events: any[];
  timeFormat: string;
  timeAndDateFromat: string;
}



export type EditingDialogOfPakeepElementProps =  {
  title: string;
  text: string;
  correctColor: string ;
  correctBackground: string ;
  id: string;
  dialogIconsUtilsProps: IconsUtilsPropsType;
  customColor: any;
  dialogAttributeGroupProps: attributeGroupProps;
  handleClosePakeepDialog: Function;
}

export type OnChangeInterface =  {
  target: { name: string; value: string };
}

export type InputProps =  {
  placeholder: string;
  autoComplete: string;
  onChange: (target: OnChangeInterface) => void;
  fullWidth: boolean;
  name: string;
  autoFocus?: boolean;
  value: string;
  multiline?: boolean;
}

type StringOrBoolean = string | boolean;

export interface ActionsButtonGroupProps {
  onSave:  any; //func
  onClose:  any; //func
  colorOfCloseButton: StringOrBoolean;
  colorOfSaveButton: StringOrBoolean;
}

export interface StateInteface {
  title: string;
  text: string;
}

export interface UseStylesInteface {
  backgroundColor: string;
  color: string;
}

export interface IconsUtilsProps {
  widthOfContainer: number;
  arrOfButtonNamesWhichSholudBeHidden: [string];
}


