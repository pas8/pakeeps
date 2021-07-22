import { CustomColorType } from 'models/types';

export const useGetSwitchCustomColorOfDialogSteper = (customColor: CustomColorType): CustomColorType => {
  return {
    ...customColor,
    hover: customColor.secondaryColor,
    bgHover: customColor.hover,
    unHover: customColor.bgHover
  };
};
