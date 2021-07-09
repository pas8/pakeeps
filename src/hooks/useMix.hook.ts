import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { CustomColorType } from 'models/types';

export const useMix = (customColor: CustomColorType, ratio = 0.8, isReversed?: boolean) => {
  extend([mixPlugin]);

  const fistColor = customColor?.hover;

  const secondColor = colord(customColor?.bgHover).invert().toHex();
  const mixedColor = colord(fistColor).mix(secondColor, ratio).toHex();

  return isReversed ? colord(mixedColor).invert().toHex() : mixedColor;
};
