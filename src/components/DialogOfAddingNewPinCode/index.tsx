import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Grid } from '@material-ui/core';
import { FC } from 'react';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import AuthWithLocalPinCode from 'components/AuthWithLocalPinCode';
import { DialogOfAddingNewPinCodePropsType } from './types';

const DialogOfAddingNewPinCode: FC<DialogOfAddingNewPinCodePropsType> = ({
  open,
  onClose,
  onSave,
  authWithLocalPinCodeProps
}) => {
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
