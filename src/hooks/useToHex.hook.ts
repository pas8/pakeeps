import { colord } from 'colord';

export const useToHex = (color: string) => {
  return colord(color).toHex();
};
