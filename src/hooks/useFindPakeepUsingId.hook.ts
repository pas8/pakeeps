import { find } from 'lodash';
import { UseFindPakeepUsingIdType } from 'models/types';
import { useSelector } from 'react-redux';
import { getPakeeps } from 'store/modules/App/selectors';

export const useFindPakeepUsingId: UseFindPakeepUsingIdType = id => {
  const pakeeps = useSelector(getPakeeps);

  const findedPakeep = find(pakeeps, ['id', id]);
  return !!findedPakeep ? findedPakeep : null;
};
