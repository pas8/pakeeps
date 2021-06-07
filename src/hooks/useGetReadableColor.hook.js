import { colord } from 'colord';
import { useEffect, useState } from 'react';
import { useGetColor } from './useGetColor.hook';
import { useIsColorDark } from './useIsColorDark.hook';
import { useMix } from './useMix.hook';

export const useGetReadableColor = (backgroundColor, color = 'default') => {
  const [colorState, setColorState] = useState([false, { hover: '', unHover: '' }, false]);

  useEffect(() => {
  const newColor = useGetColor(backgroundColor, color);

    setColorState(newColor);
  }, [backgroundColor, color]);

  return [...colorState];
};
