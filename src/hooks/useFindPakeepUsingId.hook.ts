import { find } from 'lodash';
import { UseFindPakeepUsingIdType } from 'models/types';
//@ts-ignore
export const useFindPakeepUsingId: UseFindPakeepUsingIdType = (pakeeps, id) => {
  const findedPakeep = find(pakeeps, ['id', id]);

  return findedPakeep;
};
