export const useGetReversedCustomColor = customColor => {
  const reversedColor = {
    hover: customColor.bgUnHover,
    unHover: customColor.bgHover,
    bgHover: customColor.hover,
    bgUnHover: customColor.unHover
  };
  return reversedColor;
};
