import { find } from 'lodash';
import { UseFindPakeepUsingIdType } from 'models/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPakeeps } from 'store/modules/App/selectors';

export const useFindPakeepUsingId: UseFindPakeepUsingIdType = id => {
  const [findedPakeep, setFindedPakeep] = useState<any>({ backgroundColor: '', color: '', title: '', text: '' });

  const pakeeps = useSelector(getPakeeps);

  useEffect(() => {
    const findedPakeep = find(pakeeps, ['id', id]);
    if (!findedPakeep) return;
    setFindedPakeep(findedPakeep);
  }, [id]);

  return findedPakeep;
};
