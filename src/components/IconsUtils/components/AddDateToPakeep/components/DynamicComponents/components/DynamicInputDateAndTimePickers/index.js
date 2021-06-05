import PropTypes from 'prop-types';
import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { Grid, InputAdornment, makeStyles, Box } from '@material-ui/core';
import { memo } from 'react';
import { format as toFormat } from 'date-fns';
import { useAlpha } from 'hooks/useAlpha.hook';
import CloseIcon from '@material-ui/icons/Close';
import IconButtonByPas from 'components/IconButton';
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

      '& button:hover': {
        color:defaultColor,
        background: useAlpha( defaultColor,0.32)
      },
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
  onlyTime,
  icon,
  name,
  customColor,
  inputValue,
  ampm = false,
  value,
  format,
  correctName,
  title,
  focusedEventId,
  handleDateAndTimeInputsState,
  onClickOfCloseIcon
}) => {
  const classes = useStyles({ keyboardIconColor: customColor.hover, correctName, customColor, onlyTime });

  const onChange = (date, value) => {
    handleDateAndTimeInputsState(name, date, value);
  };

  const onAccept = date => {
    const inputValue = toFormat(date, format);
    handleDateAndTimeInputsState(name, date, inputValue);
  };

  const autoFocus = focusedEventId === name;

  const keyboardPickerState = {
    value,
    inputValue,
    onChange,
    key: name,
    todayButton: !onlyTime,
    inputVariant: 'outlined',
    keyboardIcon: icon,
    autoOk: false,
    format,
    disablePast: true,
    customColor,
    error: false,
    autoFocus,
    onAccept,
    ampm,
    variant: 'dialog',
    InputAdornmentProps: { position: 'start' },
    InputProps: {
      endAdornment: (
        <InputAdornment position={'end'} className={classes.containerOfEndAdornment}>
          <Typography component={'p'}> {title}</Typography>
          <Box ml={1.4}>
            <IconButtonByPas icon={CloseIcon} size={'small'} onClick={onClickOfCloseIcon} />
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
  clickStatus: PropTypes.bool,
  correctName: PropTypes.any,
  customColor: PropTypes.shape({
    hover: PropTypes.any
  }),
  focusedEventId: PropTypes.string,
  format: PropTypes.string,
  handleDateAndTimeInputsState: PropTypes.func,
  icon: PropTypes.any,
  inputValue: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClickOfCloseIcon: PropTypes.func,
  onlyTime: PropTypes.bool,
  savedStatus: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string
};

export default memo(DynamicInputDateAndTimePickers);
