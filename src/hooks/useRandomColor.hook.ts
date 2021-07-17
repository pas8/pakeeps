import { colord } from 'colord';
import { random } from 'lodash';

export const useRandomColor = () => {
  const randomColor = colord({ r: random(256), g: random(256), b: random(256) }).toHex();
  return randomColor;
};
