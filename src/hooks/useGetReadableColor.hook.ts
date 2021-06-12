import { colord } from 'colord';
import { CustomColorType } from 'models/interfaces';
import { useEffect, useState } from 'react';
import { useGetColor } from './useGetColor.hook';
import { useIsColorDark } from './useIsColorDark.hook';
import { useMix } from './useMix.hook';

const nullityCustomColor = { isDefault: true, hover: '', unHover: '', bgHover: '', bgUnHover: '', secondaryColor: '' };
export type CustomColorType = typeof nullityCustomColor;

const nulittyColorState = [nullityCustomColor, false, false];

type ColorStateType = (CustomColorType | boolean)[];

export const useGetReadableColor = (backgroundColor: string, color = 'default'): ColorStateType => {
  const [colorState, setColorState] = useState<ColorStateType>(nulittyColorState);

  useEffect(() => {
    const newColor = useGetColor<ColorStateType, CustomColorType>(backgroundColor, color);

    setColorState(newColor);
  }, [backgroundColor, color]);

  return colorState;
};
