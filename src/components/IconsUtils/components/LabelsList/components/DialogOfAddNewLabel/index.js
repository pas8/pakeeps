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
  Typography,
  TextField,
  FormControlLabel
} from '@material-ui/core';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { handleAddNewGlobalLabelThunk } from 'store/modules/App/operations';
import SteperOfDialogOfAddNewLabel from './components/Steper';
import { Switch } from '@material-ui/core';
import FirstStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/First';
import SecondStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Second';
import ThirdStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Third';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(theme => ({}));

const DialogOfAddNewLabel = ({ isDialogOpen, handleCloseAddNewLabelDialog, handleAddNewGlobalLabelThunk }) => {
  const classes = useStyles();

  const labelVariants = ['outlined', 'default'];

  const nullityOfNewLabelState = {
    title: '',
    variant: labelVariants[0],
    id:nanoid(),
    color:''
  };
  const [newLabelState, setNewLabelState] = useState(nullityOfNewLabelState);

  const isLabelOutlined = newLabelState.variant === labelVariants[0];

  const handleCloseDialog = () => {
    console.log('log');
  };

  const handleSave = () => {
    console.log('log');
  };

  const onChangeOfLabelTitleInput = ({ target: { value } }) => setNewLabelState(state => ({ ...state, title: value }));
  const onChangeOfLabelVariantSwitch = () => {
    setNewLabelState(state => ({ ...state, variant: isLabelOutlined ? labelVariants[1] : labelVariants[0] }));
  };
  const onChangeOfLabelColorRadio = ({ target: { value } }) => setNewLabelState(state => ({ ...state, color: value }));

  const stepsArrOfDialogOfAddNewLabel = [
    {
      title: 'Enter the title',
      component: FirstStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: newLabelState.title, onChange: onChangeOfLabelTitleInput }
    },
    {
      title: 'Chose a variant',
      component: SecondStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { checked: isLabelOutlined, onChange: onChangeOfLabelVariantSwitch }
    },
    {
      title: 'Chose a color',
      component: ThirdStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: newLabelState.color, onChange: onChangeOfLabelColorRadio }
    }
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
