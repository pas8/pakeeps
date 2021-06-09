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

interface DialogIconsUtilsProps {
  isAllIconsIsShown: boolean;
  setEditTitleIsTrue:  any; //func
  handleSetFavoritePakeep:  any; //func
  changingTitle: false;
  labels: any;
  id: string;
  handleSetBackgroundColorPakeep: () => void;
  handleSetColorPakeep: void;
  isBackgroundColorDefault: boolean;
  isColorDefault: boolean;
  customColor: any;
  handleSetIsPinnedPakeep: boolean;
}

export interface EditingDialogOfPakeepElementProps {
  title: string;
  text: string;
  correctColor: string | boolean;
  correctBackground: string | boolean;
  id: string;
  dialogIconsUtilsProps: DialogIconsUtilsProps;
  customColor: any;
  dialogAttributeGroupProps: attributeGroupProps;
  handleClosePakeepDialog: void;
}

export interface OnChangeInterface {
  target: { name: string; value: string };
}

export interface InputProps {
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
// export interface ClassesInterface {

// }

export interface IconsUtilsProps {
  widthOfContainer: number;
  arrOfButtonNamesWhichSholudBeHidden: [string];
}

export interface DialogAttributeGroupProps {}

export interface AllAttributeGroupProps extends DialogIconsUtilsProps, IconsUtilsProps {}
