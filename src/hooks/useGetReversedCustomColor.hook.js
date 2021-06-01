export const useGetReversedCustomColor = (customColor, secondVarinat = false) => {
  if (!customColor) return customColor;
  const reversedColor = {
    hover: customColor.bgUnHover,
    unHover: customColor.bgHover,
    bgHover: customColor.hover,
    bgUnHover: customColor.unHover
  };

  const secondVarinatReversedColor = {
    hover: customColor.bgHover,
    unHover: customColor.bgUnHover,
    bgHover: customColor.unHover,
    bgUnHover: customColor.hover
  };

  return secondVarinat ? secondVarinatReversedColor : reversedColor;
};
