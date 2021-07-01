import { useIsColorLight } from './useIsColorLight.hook';

export const useContrastText = (color: string) => {
  const isLight = useIsColorLight(color);

  const contrastText = !isLight ? '#fff' : '#000';
  console.log(contrastText)
  return contrastText;
};
