import { RgbaColor } from "colord";

export type PickerColorElementPropsType = {
  name: string;
  setColor: (color: string) => void;
  color: RgbaColor;
  isSelected:boolean
  onClick:()=> void;
  colorFormat:string
};

