import {
  Dialog,
  Grid,
  makeStyles,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Stepper,
  StepLabel,
  StepContent,
  Step,
  Typography
} from '@material-ui/core';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { handleAddNewGlobalLabelThunk } from 'store/modules/App/operations';
import SteperOfDialogOfAddNewLabel from './components/Steper';

const useStyles = makeStyles(theme => ({}));

const DialogOfAddNewLabel = ({ isDialogOpen, handleCloseAddNewLabelDialog, handleAddNewGlobalLabelThunk }) => {
  const classes = useStyles();

  const [newLabelState, setNewLabelState] = useState();

  const handleCloseDialog = () => {
    console.log('log');
  };

  const handleSave = () => {
    console.log('log');
  };

  const stepsArrOfDialogOfAddNewLabel = [
    { title: 'Enter the title', component: <div>Enter the title</div> },
    { title: 'Chose a variant', component: <div>Chose a variant</div> },
    { title: 'Chose a color', component: <div>Chose a color</div> }
  ];

  const steperOfDialogOfAddNewLabelProps = {
    stepsArrOfDialogOfAddNewLabel
  };
  return (
    <Dialog open={true} onClose={handleCloseAddNewLabelDialog}>
      <DialogTitle>Add new global label</DialogTitle>
      <SteperOfDialogOfAddNewLabel {...steperOfDialogOfAddNewLabelProps} />
      <DialogActions>
        <Button onClick={handleCloseDialog} style={{ color: themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal }}>
          Close
        </Button>
        <Button onClick={handleSave} color={'primary'} startIcon={<SaveRoundedIcon />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogOfAddNewLabel.propTypes = {};

const mapDispatchToProps = dispatch => ({
  handleAddNewGlobalLabelThunk: newLabel => dispatch(handleAddNewGlobalLabelThunk(newLabel))
});

export default connect(null, mapDispatchToProps)(DialogOfAddNewLabel);
