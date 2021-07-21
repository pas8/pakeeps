import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Grid } from '@material-ui/core';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@material-ui/lab';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { DialogOfAddingNewPinCodePropsType } from './types';

const DialogOfAddingNewPinCode: FC<DialogOfAddingNewPinCodePropsType> = ({
  open,
  onClose,
  onSave,
  authWithLocalPinCodeProps
}) => {
  const AuthWithLocalPinCode = dynamic(() => import('components/AuthWithLocalPinCode'), {
    loading: () => (
      <>
        <Skeleton variant={'rect'} width={320} height={420} />
      </>
    )
  });

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography variant={'h6'}>Pin code</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <AuthWithLocalPinCode {...authWithLocalPinCodeProps} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <ActionsButtonGroup onClose={onClose} onSave={onSave} />
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfAddingNewPinCode;
