import { colord } from 'colord';
import { ColorStateType } from 'models/types';
import { useEffect, useState } from 'react';
import { useGetColor } from './useGetColor.hook';
import { useIsColorLight } from './useIsColorLight.hook';
import { useMix } from './useMix.hook';

export const useGetReadableColor = (
  backgroundColor: string,
  color = 'default',
  isIgnoreValidation?: boolean
): ColorStateType => {
  const nullityCustomColor = {
    isUseDefault: true,
    hover: '',
    unHover: '',
    bgHover: '',
    bgUnHover: '',
    secondaryColor: ''
  };
  const nulittyColorState: ColorStateType = [nullityCustomColor, false, false];

  const [colorState, setColorState] = useState<ColorStateType>(nulittyColorState);

  useEffect(() => {
    const newColor = useGetColor(backgroundColor, color, isIgnoreValidation);

    setColorState(newColor);
  }, [backgroundColor, color]);

  return colorState;
};
