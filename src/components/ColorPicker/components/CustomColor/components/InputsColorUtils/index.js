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
import IconUtilsOfCustomGradient from 'components/ColorPicker/components/CustomGradient/components/IconUtils';

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
    
    margin: theme.spacing(0, 1.4),
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

const InputsColorUtilsOfCustomColorPicker = ({ color, setColor, customColorsInHexFormat, customFormatName }) => {
  extend([lchPlugin]);
  const classes = useStyles({ customColorsInHexFormat });

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
  const alphaColorCanalProperty = { maxLength: 100, shotName: 'A', name: 'Alpha' };
  const currentCustomFormatInputsGroupArr = _.concat(formatPropertiesArr[customFormatName], alphaColorCanalProperty);
  const customFormatElementNames = ['first', 'second', 'third', 'alpha'];
  const sumReduceFunc = (sum, name) => ({ ...sum, [name]: '' });
  const nullityValueOfCustomFormatState = _.reduce(customFormatElementNames, sumReduceFunc, '');

  const [colorInHexFormat, setColorInHexFormat] = useState(customColorsInHexFormat);
  const [customFormatState, setCustomFormatState] = useState(nullityValueOfCustomFormatState);
  const [customFormatElementFocusStatus, setCustomFormatElementFocus] = useState(false);

  const onChangeOfColorInHexFormat = ({ target: { value } }) => {
    if (value.length >= 3) setColor(value);
    setColorInHexFormat(value);
  };
  // console.log(customColorsInHexFormat)
  const onChangeOfCustomFormatState = ({ target: { value, name: idx } }) => {
    const isValid = currentCustomFormatInputsGroupArr[idx].maxLength >= +value;
    const currentValue = isValid ? value : currentCustomFormatInputsGroupArr[idx].maxLength.toString();
    setCustomFormatState(state => ({ ...state, [customFormatElementNames[idx]]: currentValue }));
  };

  useEffect(() => {
    _.debounce(() => setColorInHexFormat(customColorsInHexFormat), 160);
    console.log(customColorsInHexFormat);
  }, [customColorsInHexFormat]);

  useEffect(() => {
    setColor(colorInHexFormat);
  }, [colorInHexFormat]);

  useEffect(() => {
    const correctFormatObj = {
      //! to make  better logic
      [customFormatName[0]]: customFormatState[customFormatElementNames[0]],
      [customFormatName[1]]: customFormatState[customFormatElementNames[1]],
      [customFormatName[2]]: customFormatState[customFormatElementNames[2]],
      a: customFormatState[customFormatElementNames[3]] / 100
    };
    setColorInHexFormat(colord(correctFormatObj).toHex());
    setColor(colord(correctFormatObj).toRgb());
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

            const outlinedInputProps = {
              type: 'number',
              onChange: onChangeOfCustomFormatState,
              name: idx,
              labelWidth: currentLabelName.length * 9.6,
              value: customFormatState[customFormatElementNames[idx]],
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
      <IconUtilsOfCustomGradient/>
    </Grid>
  );
};

export default InputsColorUtilsOfCustomColorPicker;
