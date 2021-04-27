import PropTypes from 'prop-types';
import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { Grid, makeStyles } from '@material-ui/core';
import { themeColors } from 'components/theme';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { useCallback, useEffect, useState } from 'react';
import { addDays, isValid } from 'date-fns';

const useStyles = makeStyles(theme => ({
  container: ({ keyboardIconColor, correctName, error }) => ({
    marginLeft: theme.spacing(-0.4),
    '& button': { color: error ? '#f44336CC' : correctName ? keyboardIconColor : 'rgba(255,255,255,0.42)' },
    '& div::before': { borderColor: correctName ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' },
    '& input': { color: correctName ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.8)' },
    '& p': { display: 'none' }
  })
}));

const DynamicInputDateAndTimePickers = ({
  onChange,
  onlyTime,
  KeyboardIcon,
  name,
  ampm,
  itemState: { saved: savedStatus, isValid:propsIsValid, value },
  correctName,
  title
}) => {
  const error = !propsIsValid;
  const keyboardIconColor = savedStatus ? themeColors.primaryMain : null;
  const classes = useStyles({ keyboardIconColor, correctName, error });

  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const isInputValueValid = isValid(inputValue);

  document.onkeydown = evt => (evt.key === 'Enter' && focus && isInputValueValid ? onChange(name, inputValue) : null);

  const onAccept = data => onChange(name, data);
  const onFocus = () => setFocus(true);
  const keyboardPickerState = {
    value: inputValue,
    onChange: setInputValue,
    todayButton: !onlyTime,
    label: !correctName ? title : error ? 'Invalid Date Format ' : null,
    inputVariant: 'outlined',
    keyboardIcon: savedStatus ? <DoneOutlineOutlinedIcon /> : <KeyboardIcon />,
    autoOk: false,
    format: onlyTime ? 'hh:mm' : 'yyyy  /  MM  /  dd  /  hh:mm',
    disablePast: true,
    error,
    onFocus,
    onAccept,
    ampm
  };

  return (
    <Grid item className={classes.container}>
      {!onlyTime ? (
        <KeyboardDateTimePicker {...keyboardPickerState} />
      ) : (
        <KeyboardTimePicker {...keyboardPickerState} />
      )}
    </Grid>
  );
};

DynamicInputDateAndTimePickers.propTypes = {
  KeyboardIcon: PropTypes.node,
  ampm: PropTypes.bool,
  clickStatus: PropTypes.any,
  correctName: PropTypes.any,
  error: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onlyTime: PropTypes.bool,
  savedStatus: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string
};

export default DynamicInputDateAndTimePickers;
