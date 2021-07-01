export type PickerOfThemeColorPropsType = {
  title: string;
  handleChangeColor: (color: string, isRandom?: boolean) => void;
  color: string;
  isColorRandom: boolean;
};
