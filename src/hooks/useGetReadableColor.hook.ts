import { colord } from 'colord';
import { CustomColorType } from 'models/interfaces';
import { useEffect, useState } from 'react';
import { useGetColor } from './useGetColor.hook';
import { useIsColorDark } from './useIsColorDark.hook';
import { useMix } from './useMix.hook';

const nullityCustomColor = { hover: '', unHover: '', bgHover: '', bgUnHover: '', secondaryColor: '' };
type NullityCustomColorType = typeof nullityCustomColor;

const nulittyColorState = [nullityCustomColor, false, false];

type ColorStateType = (NullityCustomColorType | boolean)[];

export const useGetReadableColor = (backgroundColor: string, color = 'default'): ColorStateType => {
  const [colorState, setColorState] = useState<ColorStateType>(nulittyColorState);

  useEffect(() => {
    const newColor = useGetColor<ColorStateType, NullityCustomColorType>(backgroundColor, color);

    setColorState(newColor);
  }, [backgroundColor, color]);

  return colorState;
};
