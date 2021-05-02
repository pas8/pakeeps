import { Grid, InputAdornment, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useState } from 'react';
import _ from 'lodash';
const useStyles = makeStyles(theme => ({
  inputAdornmentArrowContainer: {
    marginRight: theme.spacing(-0.8),
    '& button': {
      padding: 0,
      border: 'none',
      '&:hover': {
        color: 'white'
      }
    }
  }
}));

const NumberAdornment = ({ setStateFunc }) => {
  const classes = useStyles();
  const preventDefaultFunc = e => e.preventDefault();
  const handleDecrement = () => setStateFunc(number => number - 1);
  const handleIncrement = () => setStateFunc(number => number + 1);

  return (
    <InputAdornment position={'end'} className={classes.inputAdornmentArrowContainer}>
      <ToggleButtonGroup orientation={'vertical'} value={'null'} exclusive size={'small'}>
        <ToggleButton value={'plus'} aria-label={'plus one'} onClick={handleIncrement} onMouseDown={preventDefaultFunc}>
          <AddOutlinedIcon />
        </ToggleButton>
        <ToggleButton
          value={'minus'}
          aria-label={'minus one'}
          onClick={handleDecrement}
        >
          <RemoveOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </InputAdornment>
  );
};

NumberAdornment.propTypes = {
  setStateFunc: PropTypes.func
};

export default NumberAdornment;
