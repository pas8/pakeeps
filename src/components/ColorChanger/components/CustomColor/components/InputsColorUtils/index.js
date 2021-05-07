import clsx from 'clsx';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import {
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography
} from '@material-ui/core';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import lchPlugin from 'colord/plugins/lch';
import { colord, extend } from 'colord';
import _, { sum } from 'lodash';
import NumberAdornment from '../NumberAdornment';
import { useDebounce, useUpdateEffect } from 'react-use';

const useStyles = makeStyles(theme => ({
  textFieldInHexFormat: {
    width: theme.spacing(8 + 4 + 2),
    marginRight: theme.spacing(1.4 + 4),
    '& .MuiFormLabel-root.Mui-focused ': { color: ({ customColorsInHexFormat }) => customColorsInHexFormat },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ customColorsInHexFormat }) => customColorsInHexFormat
    }
  },
  removeMarginFromTextFieldInHexFormat: {
    width: theme.spacing(8 + 4 + 2),
    marginRight: theme.spacing(1.4)
  },
  textField: {
    width: theme.spacing(12)
    // transition: theme.transitions.create('all', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.complex,
    // })
  },
  containerOfInputsOfColorPicker: {
    '& > div': {
      // width: '20ch',
      ' & input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none'
      }
    }
  },

  inputAdornmentArrowContainer: {
    marginRight: theme.spacing(-0.8),
    '& button': {
      padding: 0,
      border: 'none',
      '&:hover': {
        color: 'white'
      }
    }
  },
  textFieldUnfocused: {
    // transition: theme.transitions.create('all', {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,

    // }),
    width: theme.spacing(8)
  },
  containerOfInputsGroupOfCustomFormatColor: {
    gap: theme.spacing(1.4),

    '& .MuiFormLabel-root.Mui-focused ': { color: ({ customColorsInHexFormat }) => customColorsInHexFormat },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ customColorsInHexFormat }) => customColorsInHexFormat
    }
  }
}));

const toCorrectFormat = (colorToFormatted, format) => {
  const color = colord(colorToFormatted);
  extend([lchPlugin]);

  switch (format) {
    case 'rgb':
      return color.toRgb();

    case 'hsl':
      return color.toHsl();

    case 'hsv':
      return color.toHsl();

    case 'lch':
      return color.toLch();

    default:
      return format;
  }
};

const InputsColorUtilsOfCustomColorPicker = ({
  color,
  setColor,
  customColorsInHexFormat,
  customFormatName,
  gradientStatus,
  focusOfPicker
}) => {
  const classes = useStyles({ customColorsInHexFormat });
  const colorInCorrectFormat = toCorrectFormat(color, customFormatName);

  const colorInCorrectFormatArr = _.valuesIn(colorInCorrectFormat);

  const formatPropertiesArr = {
    rgb: [
      { maxLength: 255, shotName: 'R', name: 'Red' },
      { maxLength: 255, shotName: 'G', name: 'Green' },
      { maxLength: 255, shotName: 'B', name: 'Blue' }
    ],
    hsl: [
      { maxLength: 360, shotName: 'H', name: 'Hue' },
      { maxLength: 100, shotName: 'S', name: 'Saturation' },
      { maxLength: 100, shotName: 'L', name: 'Lightness' }
    ],
    hsv: [
      { maxLength: 360, shotName: 'H', name: 'Hue' },
      { maxLength: 100, shotName: 'S', name: 'Saturation' },
      { maxLength: 100, shotName: 'V', name: 'Value' }
    ],
    lch: [
      { maxLength: 100, shotName: 'L', name: 'Lightness' },
      { maxLength: 132, shotName: 'C', name: 'Chroma' },
      { maxLength: 360, shotName: 'H', name: 'Hue' }
    ]
  };
  const correctFormatName = `${customFormatName}a`;

  const alphaColorCanalProperty = { maxLength: 1, shotName: 'A', name: 'Alpha' };
  const currentCustomFormatInputsGroupArr = _.concat(formatPropertiesArr[customFormatName], alphaColorCanalProperty);

  const [colorInHexFormat, setColorInHexFormat] = useState(customColorsInHexFormat);
  const [customFormatState, setCustomFormatState] = useState(colorInCorrectFormatArr);
  const [customFormatElementFocusStatus, setCustomFormatElementFocus] = useState(false);

  const onChangeOfColorInHexFormat = ({ target: { value } }) => {
    if (value.length >= 3) setColor(value);
    setColorInHexFormat(value);
  };
  // console.log(customColorsInHexFormat)
  const onChangeOfCustomFormatState = ({ target: { value, name: idx } }) => {
    const maxLength = currentCustomFormatInputsGroupArr[idx].maxLength;
    const isValid = maxLength >= +value;

    const currentValue = isValid ? value : maxLength;
    const clonedCustomFormatState = _.clone(customFormatState);
    clonedCustomFormatState.splice(idx, 1, currentValue);

    setCustomFormatState(clonedCustomFormatState);
  };


  const [, cancel] = useDebounce(
    () => {
      setCustomFormatState(colorInCorrectFormatArr);
    },
    96,
    [color]
  );

  // useEffect(() => {
  //   setCustomFormatState(colorInCorrectFormatArr);
  // }, []);
  // useEffect(() => {
  //   !gradientStatus && _.debounce(() => setColorInHexFormat(customColorsInHexFormat), 160);
  // }, [customColorsInHexFormat]);

  // useEffect(() => {
  //   !gradientStatus && setFocusStatusOfPicker(false);
  //   // !focusOfPicker && setColor(colorInHexFormat);
  //   // !focusOfPicker && console.log(colorInHexFormat,color);
  //   focusOfPicker && console.log('focusOfPicker is' + focusOfPicker);
  //   !focusOfPicker && console.log('focusOfPicker is' + focusOfPicker);
  // }, [colorInHexFormat, gradientStatus, color]);

  useEffect(() => {
    const colorIsCorrectFormatObj = _.mapKeys(customFormatState, (el, idx) => correctFormatName[idx]);
    const colordWhichShouldBeSet = colord(colorIsCorrectFormatObj).toRgb();
    setColor(colordWhichShouldBeSet);
  }, [customFormatName, customFormatState]);

  const onInputFocus = ({ target: { name } }) => setCustomFormatElementFocus(name);
  const onButtonClick = name => console.log(name);
  const onInputBlur = () => setCustomFormatElementFocus(false);

  const inputInHexFormatProps = useMemo(
    () => ({
      labelText: 'Hex',
      maxLength: 8,
      type: 'text',
      ariaLabel: 'Enter pl a hex value',
      value: customFormatElementFocusStatus === 'hex' ? colorInHexFormat : customColorsInHexFormat,
      maxValue: 'any',
      onChange: onChangeOfColorInHexFormat,
      hexFormat: true,
      labelWidth: 3 * 9.6,
      name: 'hex',
      onFocus: onInputFocus,
      onBlur: onInputBlur
    }),
    [customColorsInHexFormat, onChangeOfColorInHexFormat, customFormatElementFocusStatus]
  );

  return (
    <Grid className={classes.containerOfInputsOfColorPicker} container>
      <Grid item>
        <FormControl
          variant={'outlined'}
          className={clsx(
            customFormatElementFocusStatus && customFormatElementFocusStatus !== 'hex'
              ? classes.removeMarginFromTextFieldInHexFormat
              : classes.textFieldInHexFormat
          )}
        >
          <InputLabel>Hex</InputLabel>
          <OutlinedInput {...inputInHexFormatProps} />
        </FormControl>
      </Grid>

      <Grid item>
        <Grid container className={classes.containerOfInputsGroupOfCustomFormatColor}>
          {currentCustomFormatInputsGroupArr.map(({ maxLength, shotName, name }, idx) => {
            const isFocused = customFormatElementFocusStatus === `${idx}`;
            const currentLabelName = isFocused ? name : shotName;
            const onClick = () => onButtonClick(name);
            const labelWidth = currentLabelName.length * 9.6;

            const outlinedInputProps = {
              type: 'number',
              onChange: onChangeOfCustomFormatState,
              name: idx,
              labelWidth,
              value: customFormatState[idx],
              endAdornment: isFocused ? <NumberAdornment /> : null
            };

            return (
              <FormControl
                variant={'outlined'}
                className={clsx(isFocused ? classes.textField : classes.textFieldUnfocused)}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              >
                <InputLabel className={classes.toUpperCase}>{currentLabelName}</InputLabel>
                <OutlinedInput {...outlinedInputProps} />
              </FormControl>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputsColorUtilsOfCustomColorPicker;
