import { colord } from 'colord';

export const useAlpha = (color:string, value:number = 0.16) => {
  const colorWithAlpha = colord(color).alpha(value).toHex();
  return colorWithAlpha;
};
