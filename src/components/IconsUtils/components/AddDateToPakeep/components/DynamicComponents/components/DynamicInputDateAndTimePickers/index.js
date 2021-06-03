import PropTypes from 'prop-types';
import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { Grid, InputAdornment, makeStyles, withStyles, Checkbox, Box } from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { useCallback, useEffect, useState } from 'react';
import { addDays, isValid } from 'date-fns';
import { useAlpha } from 'hooks/useAlpha.hook';
import CloseIcon from '@material-ui/icons/Close';
import IconButtonByPas from 'components/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles(({ spacing, typography: { h4 } }) => ({
  container: ({ keyboardIconColor, correctName, error, customColor, onlyTime }) => ({
    marginRight: spacing(-0.4),
    '& button': {
      color: error ? '#f44336CC' : correctName ? keyboardIconColor : 'rgba(255,255,255,0.42)',
      margin: spacing(0, -1.4, 0, -1.4)
    },

    '& p': {
      color: customColor.unHover
    },

    '& input': {
      color: customColor.hover,

      // color: correctName ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.8)',
      width: onlyTime ? spacing(10) : spacing(20)
    },

    // '& label.Mui-focused': {
    //   color: customColor
    // },

    '& .MuiOutlinedInput-root': {
      color: customColor.bgHover,
      justifyContent: 'space-evently',

      '& fieldset': {
        borderColor: customColor.unHover
      },
      '& button:hover  .MuiTouchRipple-root': {
        background: useAlpha(customColor.hover)
      },
      '&:hover fieldset': {
        borderColor: customColor.hover,
        boxShadow: `0px 0px 4px 1px ${useAlpha(customColor.hover, 0.42)}`
      },
      '&.Mui-focused fieldset': {
        borderColor: customColor.hover,
        boxShadow: `0px 0px 4px 1px ${customColor.hover}`
      },
      '&.Mui-focused ': {
        color: customColor.bgUnHover
      }
    }
  })
}));

const DynamicInputDateAndTimePickers = ({
  onChange,
  onlyTime,
  icon,
  name,
  customColor,
  ampm = false,
  value,
  // itemState: { saved: savedStatus, isValid: propsIsValid, value },
  correctName,
  title
}) => {
  // const error = !propsIsValid;
  const error = false;
  // const keyboardIconColor = savedStatus ? themeColors.primaryMain : null;
  const classes = useStyles({ keyboardIconColor: customColor.hover, correctName, error, customColor, onlyTime });

  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const isInputValueValid = isValid(inputValue);

  // document.onkeydown = evt => (evt.key === 'Enter' && focus && isInputValueValid ? onChange(name, inputValue) : null);

  const onAccept = data => onChange(name, data);
  const onFocus = () => setFocus(true);

  // const keyboardIcon = savedStatus ? <DoneOutlineOutlinedIcon /> : <KeyboardIcon />;

  const keyboardPickerState = {
    value: inputValue,
    // autoFocus:true,
    onChange: setInputValue,
    todayButton: !onlyTime,
    // label: !correctName ? title : error ? 'Invalid Date Format ' : null,
    inputVariant: 'outlined',
    keyboardIcon: icon,
    autoOk: false,
    format: onlyTime ? 'hh:mm' : 'yyyy  /  MM  /  dd  /  hh:mm',
    disablePast: true,
    error,
    // mask: `${title}   __:__`,
    onFocus,
    customColor,
    onAccept,
    ampm,
    variant: 'dialog',
    InputAdornmentProps: { position: 'start' },
    InputProps: {
      endAdornment: (
        <InputAdornment position={'end'} style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Typography component={'p'}> {title}</Typography>
          <Box ml={1.4}>
            <IconButtonByPas icon={CloseIcon} size={'small'}/>
          </Box>
        </InputAdornment>
      )
    },
    fullWidth: true
  };

  const KeyboardPicker = onlyTime ? KeyboardTimePicker : KeyboardDateTimePicker;

  return (
    <Grid>
      <Grid className={classes.container}>
        <KeyboardPicker {...keyboardPickerState} />
      </Grid>
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
