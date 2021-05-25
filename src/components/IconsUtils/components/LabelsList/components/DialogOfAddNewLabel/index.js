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

const useStyles = makeStyles(theme => ({}));

const DialogOfAddNewLabel = ({ isDialogOpen, handleCloseAddNewLabelDialog, handleAddNewGlobalLabelThunk }) => {
  const classes = useStyles();

  const labelVariants = ['outlined', 'default'];

  const nullityOfNewLabelState = {
    title: '',
    variant: labelVariants[0]
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

  const stepsArrOfDialogOfAddNewLabel = [
    {
      title: 'Enter the title',
      component: (
        <TextField
          required
          label={'Required'}
          variant={'outlined'}
          color={'secondary'}
          value={newLabelState.title}
          onChange={onChangeOfLabelTitleInput}
        />
      )
    },
    {
      title: 'Chose a variant',
      component: (
        <FormControlLabel
          control={<Switch checked={isLabelOutlined} onChange={onChangeOfLabelVariantSwitch} />}
          label={'Is variant Outlined? '}
        />
      )
    },
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
