import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { Grid, InputAdornment, makeStyles, Box } from '@material-ui/core';
import { FC, memo } from 'react';
import { format as toFormat, isValid } from 'date-fns';
import { useAlpha } from 'hooks/useAlpha.hook';
import CloseIcon from '@material-ui/icons/Close';
import IconButtonByPas from 'components/IconButton';
import { Typography } from '@material-ui/core';
import { extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { DynamicInputDateAndTimePickersPropsType, UseStylesOfDynamicInputDateAndTimePickersPropsType } from './types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { defaultTheme } from 'store/modules/Color/reducers';
import { useDispatch } from 'react-redux';
import { toChangeThemeColors } from 'store/modules/App/actions';
import EventEditIconByPas from 'components/Icons/components/EventEditIcon';

export const useStyles = makeStyles(({ spacing, typography: { h4 }, palette }) => ({
  '@global': {
    '.MuiPickersToolbarText-toolbarTxt,.MuiPickersToolbarText-toolbarBtnSelected': {
      color: ({ customColor }: UseStylesOfDynamicInputDateAndTimePickersPropsType) =>
        `${customColor.isUseDefault && !useIsColorLight(customColor?.bgHover) && customColor.unHover} !important`
    }
  },
  container: ({
    customColor,
    onlyTime = false,
    error,
    color = '',
    isSizeSmaller = false
  }: UseStylesOfDynamicInputDateAndTimePickersPropsType) => {
    const defaultColor = customColor.isUseDefault ? palette.text.hint : customColor.unHover;
    const defaultHoverColor = customColor.isUseDefault ? palette.text.primary : useAlpha(customColor.hover, 0.8);
    const focusedColor = error
      ? palette.error.main
      : customColor.isUseDefault
      ? !!color
        ? color
        : palette.primary.main
      : customColor.hover;

    return {
      marginRight: spacing(-0.4),
      '& button': {
        margin: spacing(0, -0.8, 0, -1.42)
      },
      '& svg': {
        color: defaultColor
      },
      '& p': {
        color: defaultColor
      },
      '& .MuiFormHelperText-root': {
        display: error ? 'block' : 'none'
      },

      '& input': {
        color: defaultHoverColor,
        width: onlyTime ? spacing(isSizeSmaller ? 8 : 10) : spacing(isSizeSmaller ? 24 : 42)
      },
      '& button:hover': {
        '& svg': {
          color: defaultHoverColor
        },
        background: useAlpha(defaultColor!, 0.2)
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
          boxShadow: customColor.isUseDefault ? '' : `0px 0px 4px 1px ${error ? palette.error.main : defaultHoverColor}`
        },
        '&.Mui-focused fieldset': {
          borderColor: focusedColor,
          boxShadow: customColor ? '' : `0px 0px 2px 1px ${error ? palette.error.main : focusedColor}`
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
  containerOfEndAdornment: ({ onlyTime = false }: UseStylesOfDynamicInputDateAndTimePickersPropsType) => ({
    // maxWidth: spacing(10),
    marginLeft: onlyTime ? spacing(-2) : spacing(-18),
    width: '100%',
    justifyContent: 'flex-end'
  })
}));

const DynamicInputDateAndTimePickers: FC<DynamicInputDateAndTimePickersPropsType> = ({
  onlyTime,
  icon,
  name,
  customColor,
  inputValue,
  ampm = false,
  color,
  value,
  format,
  correctName,
  title,
  focusedEventId,
  handleDateAndTimeInputsState,
  onClickOfCloseIcon,
  handleThemeColorsThunk,
  onClickOfEditIcon
}) => {
  const dispatch = useDispatch();

  extend([mixPlugin]);
  const error = !isValid(value);

  const classes = useStyles({ customColor, onlyTime, error, color });

  const onChange = (date: MaterialUiPickersDate, value: string | null | undefined) => {
    handleDateAndTimeInputsState(name,!!date ?  date.getTime() : 0, value);
  };

  const handleSetDefaultTheme = () => {
    dispatch(toChangeThemeColors({ newThemeColors: defaultTheme }));
  };

  const onAccept = (date: MaterialUiPickersDate) => {
    handleSetDefaultTheme();
    const inputValue = toFormat(date!, format);
    handleDateAndTimeInputsState(name, date, inputValue);
  };

  const autoFocus = focusedEventId === name;
  const onOpen = () => {
    // !customColor.isUseDefault &&
    //   dispatch(
    //     toChangeThemeColors({
    //       newThemeColors: {
    //         type: isDark ? 'dark' : 'light',
    //         primaryMain: customColor.hover,
    //         // paperMain: 'green',
    //         textColor: customColor.hover!,
    //         paperMain: customColor?.bgHover,
    //         // paperMain: useIsColorLight(customColor?.bgHover)
    //         // ? colord(customColor?.bgHover).lighten(0.04).toHex()
    //         // : colord(customColor?.bgHover).darken(0.04).toHex(),
    //         defaultBackgroundMain: customColor?.bgUnHover
    //       }
    //     })
    //   );
  };
  // const onClose = () => handleSetDefaultTheme();

  const InputProps = {
    endAdornment: (
      <InputAdornment position={'end'} className={classes.containerOfEndAdornment}>
        <Typography component={'p'}> {title}</Typography>
        <Box ml={1.4} display={'flex'}>
          <IconButtonByPas icon={EventEditIconByPas} size={'small'} onClick={onClickOfEditIcon} />
        </Box>
        <Box ml={1.4} display={'flex'} mr={-0.4}>
          <IconButtonByPas icon={CloseIcon} size={'small'} onClick={onClickOfCloseIcon} />
        </Box>
      </InputAdornment>
    )
  };

  const keyboardPickerState = {
    value,
    inputValue,
    onChange,
    key: name,
    // onOpen,
    todayButton: !onlyTime,
    inputVariant: 'outlined',
    keyboardIcon: icon,
    autoOk: false,
    format,
    disablePast: true,
    customColor,
    // onClose,
    error,
    autoFocus,
    onAccept,
    // onError: () => setError(true),
    ampm,
    variant: 'dialog',
    InputAdornmentProps: { position: 'start' },
    InputProps,
    fullWidth: true
  } as const;

  const KeyboardPicker = onlyTime ? KeyboardTimePicker : KeyboardDateTimePicker;

  return (
    <Grid>
      <Grid className={classes.container}>
        <KeyboardPicker {...keyboardPickerState} />
      </Grid>
    </Grid>
  );
};

export default memo(DynamicInputDateAndTimePickers);
