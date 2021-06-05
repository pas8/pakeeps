import PropTypes from 'prop-types';
import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { Grid, InputAdornment, makeStyles, Box } from '@material-ui/core';
import { memo } from 'react';
import { format as toFormat } from 'date-fns';
import { useAlpha } from 'hooks/useAlpha.hook';
import CloseIcon from '@material-ui/icons/Close';
import IconButtonByPas from 'components/IconButton';
import { Typography } from '@material-ui/core';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { defaultTheme } from 'store/modules/App/reducers';

const useStyles = makeStyles(({ spacing, typography: { h4 }, palette }) => ({
  '@global': {
    '.MuiPickersToolbarText-toolbarTxt': {
      color: ({ customColor, isDark }) => `${customColor && isDark && customColor.unHover} !important`
    },
    '.MuiPickersToolbarText-toolbarBtnSelected': {
      color: ({ customColor, isDark }) => `${customColor && isDark && customColor.hover} !important`
    },
    '.MuiPickersModal-dialogRoot': {
      borderRadius: ({customColor})=> customColor && '6px'
    }
  },
  container: ({ customColor, onlyTime, isDark }) => {
    const defaultColor = !customColor ? palette?.mediumEmphasis?.main : customColor.unHover;
    const defaultHoverColor = !customColor ? palette?.maxEmphasis?.main : useAlpha(customColor.hover, 0.8);
    const focusedColor = !customColor ? palette?.primary?.main : customColor.hover;

    return {
      marginRight: spacing(-0.4),

      '& button': {
        margin: spacing(0, -0.8, 0, -1.42)
      },
      '& svg': {
        color: defaultColor
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
        '& svg': {
          color: defaultHoverColor
        },
        background: useAlpha(defaultColor, 0.2)
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
          borderColor: defaultHoverColor,
          boxShadow: customColor && `0px 0px 4px 1px ${defaultHoverColor}`
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
  onClickOfCloseIcon,
  handleThemeColorsThunk
}) => {
  extend([mixPlugin]);
  const isDark = !useIsColorDark(customColor?.bgHover);

  const classes = useStyles({ keyboardIconColor: customColor.hover, correctName, customColor, onlyTime, isDark });

  const onChange = (date, value) => {
    handleDateAndTimeInputsState(name, date, value);
  };

  const handleSetDefaultTheme = () => handleThemeColorsThunk(defaultTheme);

  const onAccept = date => {
    handleSetDefaultTheme();
    const inputValue = toFormat(date, format);
    handleDateAndTimeInputsState(name, date, inputValue);
  };

  const autoFocus = focusedEventId === name;
  const onOpen = () =>
    customColor &&
    handleThemeColorsThunk({
      type: isDark ? 'dark' : 'light',
      primaryMain: customColor.hover,
      // paperMain: 'green',
      paperMain: customColor?.bgHover,
      // paperMain: useIsColorDark(customColor?.bgHover)
      // ? colord(customColor?.bgHover).lighten(0.04).toHex()
      // : colord(customColor?.bgHover).darken(0.04).toHex(),
      defaultBackgroundMain: customColor?.bgUnHover
    });
  const onClose = () => handleSetDefaultTheme();
  const keyboardPickerState = {
    value,
    inputValue,
    onChange,
    key: name,
    onOpen,
    todayButton: !onlyTime,
    inputVariant: 'outlined',
    keyboardIcon: icon,
    autoOk: false,
    format,
    disablePast: true,
    customColor,
    onClose,
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
