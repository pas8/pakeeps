import { flatten, map, chain } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { getGlobalFolderId } from 'store/modules/App/selectors';
import { FoldersType } from 'store/modules/App/types';

export const useSetCorrectFolderId = (folders: FoldersType) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const folderId = useSelector(getGlobalFolderId);

  useEffect(() => {
    if (folderId) return;

    const { id } = chain(folders)
      .map(({ arr }) => arr.map(el => ({ id: el.id, route: el?.property?.route })))
      .flatten()
      .find(({ id, route }) => route === router.route)
      .value();

      if (!id) return;

    dispatch(toChangeTemporaryData({ newTemporaryData: { globalFolderId: id } }));
  }, [router, folderId]);
};
