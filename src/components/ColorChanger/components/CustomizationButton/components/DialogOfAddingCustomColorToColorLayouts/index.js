import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import ColorPickerByPas from 'components/ColorChanger';
import CustomColor from 'components/ColorChanger/components/CustomColor';
import React from 'react';
import DialogActionsOfAddingCustomColorToColorLayouts from './components/DialogActions';
import DialogContentOfAddingCustomColorToColorLayouts from './components/DialogContent';

const DialogOfAddingCustomColorToColorLayouts = ({ open, onSave, colorInHexFormat, onClose }) => {



  
  return (
    <Dialog
      aria-labelledby={'dialog-of-adding-custom-color-to-color-layouts'}
      aria-describedby={'chose-any-color-pattern-which-you-want'}
      open={!true}
    >
      <DialogTitle>{'Chose any color pattern which you want and add this pattern to your color layouts'}</DialogTitle>

      <DialogContentOfAddingCustomColorToColorLayouts colorInHexFormat={colorInHexFormat} />
      {/* <ColorPickerByPas/> */}
      <CustomColor/>
      <DialogActionsOfAddingCustomColorToColorLayouts />
    </Dialog>
  );
};

export default DialogOfAddingCustomColorToColorLayouts;
