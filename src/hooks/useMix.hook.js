import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

export const useMix = (customColor, ratio = 0.8,isReversed) => {
  extend([mixPlugin]);



const fistColor =  customColor?.hover

const secondColor = colord(customColor?.bgHover).invert().toHex()
  const mixedColor = colord(fistColor).mix(secondColor,ratio).toHex();

  return isReversed ?colord(mixedColor).invert().toHex() :  mixedColor;
};
