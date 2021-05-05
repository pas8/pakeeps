import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import ColorPickerByPas from 'components/ColorPicker';
import React from 'react';
import DialogActionsOfAddingCustomColorToColorLayouts from './components/DialogActions';
import DialogContentOfAddingCustomColorToColorLayouts from './components/DialogContent';

const DialogOfAddingCustomColorToColorLayouts = ({ open, onSave, customColorsInHexFormat, onClose }) => {
  return (
    <Dialog
      aria-labelledby={'dialog-of-adding-custom-color-to-color-layouts'}
      aria-describedby={'chose-any-color-pattern-which-you-want'}
      open={!true}
    >
      <DialogTitle>{'Chose any color pattern which you want and add this pattern to your color layouts'}</DialogTitle>

      <DialogContentOfAddingCustomColorToColorLayouts customColorsInHexFormat={customColorsInHexFormat} />
      {/* <ColorPickerByPas/> */}
      <DialogActionsOfAddingCustomColorToColorLayouts />
    </Dialog>
  );
};

export default DialogOfAddingCustomColorToColorLayouts;
