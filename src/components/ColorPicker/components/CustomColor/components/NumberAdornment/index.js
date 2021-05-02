import { Grid, InputAdornment, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
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

const NumberAdornment = ({ onClickOfPlusButton =null, onClickOfMinusButton = null }) => {
  const classes = useStyles();
  const preventDefaultFunc = e => e.preventDefault();

  return (
    <InputAdornment position={'end'} className={classes.inputAdornmentArrowContainer}>
      <ToggleButtonGroup orientation={'vertical'} value={'null'} exclusive size={'small'}>
        <ToggleButton
          value={'plus'}
          aria-label={'plus one'}
          onClick={onClickOfPlusButton}
          onMouseDown={preventDefaultFunc}
        >
          <AddOutlinedIcon />
        </ToggleButton>
        <ToggleButton
          value={'minus'}
          aria-label={'minus one'}
          onClick={onClickOfMinusButton}
          onMouseDown={preventDefaultFunc}
        >
          <RemoveOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </InputAdornment>
  );
};

NumberAdornment.propTypes = {
  onClickOfMinusButton: PropTypes.func,
  onClickOfPlusButton: PropTypes.func
}

export default NumberAdornment;
