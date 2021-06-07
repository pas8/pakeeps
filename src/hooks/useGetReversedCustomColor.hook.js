import { useSecondaryColor } from "./useSecondaryColor.hook";

export const useGetReversedCustomColor = (customColor, secondVarinat = false) => {
  if (!customColor) return customColor;

  const reversedColor = {
    ...customColor,
    hover: customColor.bgUnHover,
    unHover: customColor.bgHover,
    bgHover: customColor.hover,
    bgUnHover: customColor.unHover
  };

  const secondVarinatReversedColor = {
    ...customColor,
    hover: customColor.bgHover,
    unHover: customColor.bgUnHover,
    bgHover: customColor.unHover,
    bgUnHover: customColor.hover
  };

  const mainPart = secondVarinat ? secondVarinatReversedColor : reversedColor;

  const secondaryColor = useSecondaryColor(mainPart);
  const newColor = { ...mainPart, secondaryColor };

  return newColor;
};
