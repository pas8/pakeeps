import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';
import DialogContentOfAddingCustomColorToColorLayouts from './components/DialogContent';

const DialogOfAddingCustomColorToColorLayouts = ({ open, onSave, customColorsInHexFormat, onClose }) => {
  return (
    <Dialog
      aria-labelledby={'dialog-of-adding-custom-color-to-color-layouts'}
      aria-describedby={'chose-any-color-pattern-which-you-want'}
      open={true}
    >
      <DialogTitle>{'Chose any color pattern which you want and add this pattern to your color layouts'}</DialogTitle>

      <DialogContentOfAddingCustomColorToColorLayouts customColorsInHexFormat={customColorsInHexFormat}/>

      <DialogActions>
        <Button onClick={onClose}>
          <Typography variant={'subtitle1'}> Disagree</Typography>
        </Button>
        <Button onClick={onSave} color={'primary'} autoFocus>
          <Typography variant={'subtitle1'}> Agree</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfAddingCustomColorToColorLayouts;
