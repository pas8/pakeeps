import { Grid, InputAdornment, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useState } from 'react';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  inputAdornmentArrowContainer: ({ isSizeSmall }) => ({
    marginRight: isSizeSmall ? theme.spacing(0.2) : theme.spacing(-1),
    '& button': {
      padding: 0,
      borderRadius: 0,
      '& svg': {
        width: isSizeSmall ? '0.76em' : '',
        height: isSizeSmall ? '0.76em' : ''
      },
      border: 'none',
      '&:hover': {
        color: ({ color }) => color
      },
      '&:first-child': {
        marginBottom: isSizeSmall ? '-4px' : ''
      }
    }
  })
}));

const NumberAdornment = ({ handleIncrement, handleDecrement, color, size = 'normal' }) => {
  const isSizeSmall = size === 'small';
  const classes = useStyles({ color, isSizeSmall });
  const preventDefaultFunc = e => e.preventDefault();

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
          onMouseDown={preventDefaultFunc}
        >
          <RemoveOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </InputAdornment>
  );
};

export default NumberAdornment;
