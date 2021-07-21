import { Grid, CircularProgress, Fab } from '@material-ui/core';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';

import { getAnonymousStatus, getLoginedStatus } from 'store/modules/Auth/selectors';
import { getIsAuthedWithLocalPassword } from 'store/modules/App/selectors';
import PakeepList from 'components/PakeepList';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import {
  toChangeDefaultLayoutDialogProps,
  toChangeDefaultLayoutMenuProps,
  toChangeTemporaryData
} from 'store/modules/App/actions';
import { DialogLayoutName } from 'models/unums';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { nanoid } from 'nanoid';
import { Skeleton } from '@material-ui/lab';

// const PakeepList = dynamic(() => import('components/PakeepList'), {
//   loading: () => (
//     <Grid style={{ height: '80vh', width: '90vw' }} container alignItems={'center'} justify={'center'}>
//       <CircularProgress />
//     </Grid>
//   )
// });

const NewPakeep = dynamic(() => import('components/NewPakeep'), {
  loading: () => (
    <>
      <Skeleton variant={'rect'} width={'100%'} height={320} />
    </>
  )
});

const Pakeeps: FC = () => {
  const isLogined = useSelector(getLoginedStatus);
  const isAnonymous = useSelector(getAnonymousStatus);
  const dispatch = useDispatch();

  const { isSizeSmall, isSiveIsXs } = useBreakpointNames();

  if (!isLogined) return null;

  const handleOpenDialog = () => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { isUseEditingDialogAsNewPakeep: true } }));
    dispatch(
      toChangeDefaultLayoutDialogProps({
        props: {
          name: DialogLayoutName.PAKEEPS,
          id: nanoid()
        }
      })
    );
  };

  return (
    <>
      <Grid container justify={'center'} alignItems={'center'}>
        {!isSizeSmall ? (
          <NewPakeep />
        ) : (
          <Fab
            color={"primary"}
            aria-label={"add"}
            style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 2, padding: !isSiveIsXs ? 42 : '' }}
            onClick={handleOpenDialog}
          >
            <AddIcon />
          </Fab>
        )}
      </Grid>
      <PakeepList />
    </>
  );
};

export default Pakeeps;
