export const useGetReversedCustomColor = (customColor,secondVarinat = false) => {
  const reversedColor = {
    isUseDefault:customColor?.isUseDefault,
    hover: customColor.bgUnHover,
    unHover: customColor.bgHover,
    bgHover: customColor.hover,
    bgUnHover: customColor.unHover
  };

  const secondVarinatReversedColor = {
    isUseDefault:customColor?.isUseDefault,
    hover: customColor.bgHover,
    unHover: customColor.bgUnHover,
    bgHover: customColor.unHover,
    bgUnHover: customColor.hover
  };

  return secondVarinat  ? secondVarinatReversedColor :reversedColor;
};
