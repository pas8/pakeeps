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
const useStyles = makeStyles(({ spacing, typography: { h4 }, palette }) => ({
  container: ({ customColor, onlyTime }) => {
    const defaultColor = !customColor ? palette?.mediumEmphasis?.main : customColor.unHover;
    const focusedColor = !customColor ? palette?.primary?.main : customColor.hover;

    return {
      marginRight: spacing(-0.4),
      '& button': {
        margin: spacing(0, -1.4, 0, -1.4)
      },

      '& p': {
        color: customColor.unHover
      },

      '& input': {
        color: customColor.hover,

        // color: correctName ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.8)',
        width: onlyTime ? spacing(10) : spacing(42)
      },

      // '& label.Mui-focused': {
      //   color: customColor
      // },

      '& .MuiOutlinedInput-root': {
        color: customColor.bgHover,
        justifyContent: 'space-evently',

        '& fieldset': {
          borderColor: defaultColor
        },
        '& button:hover  .MuiTouchRipple-root': {
          background: useAlpha(customColor.hover)
        },
        '&:hover fieldset': {
          borderColor: !customColor ? palette?.maxEmphasis?.main : useAlpha(focusedColor, 0.8),
          boxShadow: customColor && `0px 0px 4px 1px ${useAlpha(focusedColor, 0.8)}`
        },
        '&.Mui-focused fieldset': {
          borderColor: focusedColor,
          boxShadow: customColor && `0px 0px 4px 1px ${focusedColor}`
        },
        '&.Mui-focused ': {
          color: customColor.bgUnHover
        },
        '& .Mui-error ': {
          borderColor: 'red'
        }
      }
    };
  },
  containerOfEndAdornment: ({ onlyTime }) => ({
    // maxWidth: spacing(10),
    marginLeft: onlyTime ? spacing(-2) : spacing(-18),
    width: '100%',
    justifyContent: 'flex-end'
  })
}));

const DynamicInputDateAndTimePickers = ({
  onChange: onChangeFunc,
  onlyTime,
  icon,
  name,
  customColor,
  ampm = false,
  value,
  correctName,
  title,
  error,
  buttonSaveState
}) => {
  const classes = useStyles({ keyboardIconColor: customColor.hover, correctName, error, customColor, onlyTime });
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    !!buttonSaveState && console.log(name,!!value);
  }, [buttonSaveState]);

  const onAccept = data => onChange(name, data);

  const keyboardPickerState = {
    value: inputValue,
    onChange: setInputValue,
    todayButton: !onlyTime,
    inputVariant: 'outlined',
    keyboardIcon: icon,
    autoOk: false,
    format: onlyTime ? 'hh:mm' : 'yyyy / MM / dd / hh:mm',
    disablePast: true,
    // mask: `${title}   __:__`,
    customColor,
    error: false,
    onAccept,
    ampm,
    variant: 'dialog',
    InputAdornmentProps: { position: 'start' },
    InputProps: {
      endAdornment: (
        <InputAdornment position={'end'} className={classes.containerOfEndAdornment}>
          <Typography component={'p'}> {title}</Typography>
          <Box ml={1.4}>
            <IconButtonByPas icon={CloseIcon} size={'small'} />
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
