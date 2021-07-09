import clsx from 'clsx';
import { FormControl, Grid, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';
import { ChangeEventHandler, FC, FocusEventHandler, memo, useEffect, useMemo, useRef, useState } from 'react';
import lchPlugin from 'colord/plugins/lch';
import { AnyColor, colord, extend, RgbaColor } from 'colord';
import _ from 'lodash';
import { useClickAway } from 'react-use';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import {
  ColorOfInputsUtils,
  FormatType,
  InputsColorUtilsOfCustomColorPickerPropsType,
  OnChangeOfCustomFormatStateType,
  UseStylesOfInputsColorUtilsOfCustomColorPickerType
} from './types';
import NumberAdornment from '../NumberAdornment';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  textFieldInHexFormat: ({
    isInputsHaveSameGap,
    colorInHexFormat
  }: UseStylesOfInputsColorUtilsOfCustomColorPickerType) => ({
    width: spacing(isInputsHaveSameGap ? 18 : 8 + 4 + 2),

    marginRight: spacing(isInputsHaveSameGap ? 1.4 : 4 + 1.4),

    [breakpoints.down('xs')]: {
      width: '100%',

      marginRight: spacing(0)
    },

    '& .MuiFormLabel-root.Mui-focused ': { color: colorInHexFormat },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colorInHexFormat
    }
  }),
  removeMarginFromTextFieldInHexFormat: {
    width: spacing(8 + 4 + 2),
    marginRight: spacing(1.4),

    [breakpoints.down('xs')]: {
      width: '100%',

      marginRight: spacing(0)
    }
  },
  textField: {
    width: spacing(12),

    [breakpoints.down('xs')]: {
      width: '32%'
    }
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
    marginRight: spacing(-0.8),
    '& button': {
      padding: 0,
      border: 'none',
      '&:hover': {
        color: 'white'
      }
    }
  },
  textFieldUnfocused: {
    width: spacing(8),
    [breakpoints.down('xs')]: {
      width: '32%'
    }
  },
  containerOfInputsGroupOfCustomFormatColor: ({
    colorInHexFormat
  }: UseStylesOfInputsColorUtilsOfCustomColorPickerType) => ({
    gap: spacing(1.4),
    [breakpoints.down('xs')]: {
      gap: spacing(0),
      marginTop: spacing(1.8)
    },
    width: '100%',

    '& .MuiFormLabel-root.Mui-focused ': { color: colorInHexFormat },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colorInHexFormat
    }
  })
}));

export enum formats {
  RGB = 'rgb',
  HSL = 'hsl',
  HSV = 'hsv',
  LCH = 'lch'
}

const toCorrectFormat = (colorToFormatted: ColorOfInputsUtils, format: FormatType) => {
  const color = colord(colorToFormatted);
  extend([lchPlugin]);

  switch (format) {
    case formats.RGB:
      return color.toRgb();

    case formats.HSL:
      return color.toHsl();

    case formats.HSV:
      return color.toHsv();

    case formats.LCH:
      return color.toLch();

    default:
      return format;
  }
};

const InputsColorUtilsOfCustomColorPicker: FC<InputsColorUtilsOfCustomColorPickerPropsType> = ({
  color,
  setColor,
  colorInHexFormat,
  customFormatName,
  isInputsHaveSameGap = false,
  gradientStatus,
  focusOfPicker,
  isHexInputHidden,
  isCustomFormatInputHidden,
  inputColor = '',
  isUseAlpha = true
}) => {
  const classes = useStyles({ colorInHexFormat: !!inputColor ? inputColor : colorInHexFormat, isInputsHaveSameGap });
  const colorInCorrectFormat = toCorrectFormat(color, customFormatName);

  const { isSiveIsXs } = useBreakpointNames();

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
  const correctFormatName = `${customFormatName}${isUseAlpha ? 'a' : ''}`;

  const alphaColorCanalProperty = { maxLength: 1, shotName: 'A', name: 'Alpha' };
  const currentCustomFormatInputsGroupArr = !isUseAlpha
    ? formatPropertiesArr[customFormatName]
    : _.concat(formatPropertiesArr[customFormatName], alphaColorCanalProperty);

  const [hexColor, setHexColor] = useState(colorInHexFormat);
  const [customFormatState, setCustomFormatState] = useState(colorInCorrectFormatArr);
  const [customFormatElementFocusStatus, setCustomFormatElementFocus] = useState('');

  const onChangeOfColorInHexFormat: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setHexColor(value);
    setCustomFormatState(_.valuesIn(toCorrectFormat(value, customFormatName)));
  };
  // console.log(colorInHexFormat)

  // console.log(colorInHexFormat)
  const onChangeOfCustomFormatState: OnChangeOfCustomFormatStateType = ({ target: { value, name: idx } }) => {
    const maxLength = currentCustomFormatInputsGroupArr[+idx].maxLength;
    const isValid = maxLength >= +value;

    const currentValue = isValid ? value : maxLength;
    const clonedCustomFormatState = _.clone(customFormatState);
    clonedCustomFormatState.splice(+idx, 1, +currentValue);
    // setHexColor()
    setCustomFormatState(clonedCustomFormatState);
    setHexColor(colord(useFromCustomFormatToCorrectFormat(clonedCustomFormatState)).toHex());
  };

  useEffect(() => {
    setColor(hexColor);
  }, [hexColor]);

  // useCustomCompareEffect(() => {
  //   setHexColor(colorInHexFormat)
  // }, [colorInHexFormat], () => _.isEqual(hexColor, colorInHexFormat));

  //!!!! const [, cancel] = useDebounce(() => setCustomFormatState(colorInCorrectFormatArr), 80, [color]);

  // useEffect(() => {
  //   setCustomFormatState(colorInCorrectFormatArr);
  // }, []);colorInHexFormat
  // useEffect(() => {
  //   !gradientStatus && _.debounce(() => setColorInHexFormat(colorInHexFormat), 160);
  // }, [colorInHexFormat]);

  // useEffect(() => {
  //   !gradientStatus && setFocusStatusOfPicker(false);onChangeOfCustomFormatState
  //   // !focusOfPicker && setColor(colorInHexFormat);
  //   // !focusOfPicker && console.log(colorInHexFormat,color);
  //   focusOfPicker && console.log('focusOfPicker is' + focusOfPicker);
  //   !focusOfPicker && console.log('focusOfPicker is' + focusOfPicker);
  // }, [colorInHexFormat, gradientStatus, color]);

  const useFromCustomFormatToCorrectFormat = (arr: number[]): AnyColor => {
    const colorIsCorrectFormatObj = _.mapKeys(arr, (el, idx) => correctFormatName[idx]);
    //@ts-ignore
    return colorIsCorrectFormatObj;
  };

  useEffect(() => {
    const colorIsCorrectFormatObj = useFromCustomFormatToCorrectFormat(customFormatState);
    const colordWhichShouldBeSet = colord(colorIsCorrectFormatObj).toRgb();
    setColor(colordWhichShouldBeSet);
  }, [customFormatName, customFormatState]);

  const onInputFocus: FocusEventHandler<HTMLInputElement> = ({ target: { name } }) => {
    setCustomFormatElementFocus(name);
  };
  const onInputBlur = () => setCustomFormatElementFocus('');

  const inputInHexFormatProps = useMemo(
    () => ({
      labelText: 'Hex',
      maxLength: 8,
      type: 'text',
      ariaLabel: 'Enter pl a hex value',
      value: hexColor,
      maxValue: 'any',
      onChange: onChangeOfColorInHexFormat,
      hexFormat: true,
      labelWidth: 3 * 9.6,
      name: 'hex',
      onFocus: onInputFocus,
      onBlur: onInputBlur
    }),
    [hexColor, customFormatElementFocusStatus]
  );

  const refOfCustomFormatElementFocus = useRef(null);
  useClickAway(refOfCustomFormatElementFocus, () => onInputBlur());

  return (
    <Grid className={classes.containerOfInputsOfColorPicker} container ref={refOfCustomFormatElementFocus}>
      {!isHexInputHidden && (
        <Grid item container={isSiveIsXs}>
          <FormControl
            variant={'outlined'}
            className={clsx(
              (!!customFormatElementFocusStatus && customFormatElementFocusStatus !== 'hex') ||
                isCustomFormatInputHidden
                ? classes.removeMarginFromTextFieldInHexFormat
                : classes.textFieldInHexFormat
            )}
          >
            <InputLabel>Hex</InputLabel>
            <OutlinedInput {...inputInHexFormatProps} />
          </FormControl>
        </Grid>
      )}

      {!isCustomFormatInputHidden && (
        <Grid item container={isSiveIsXs}>
          <Grid container className={classes.containerOfInputsGroupOfCustomFormatColor} justify={'space-between'}>
            {currentCustomFormatInputsGroupArr.map(({ maxLength, shotName, name }, idx) => {
              const isFocused = customFormatElementFocusStatus === `${idx}`;
              const currentLabelName = isFocused || isSiveIsXs ? name : shotName;
              const labelWidth = currentLabelName.length * 9.6;

              const handleIncrement = () => {
                const value = customFormatState[idx] + 1;
                onChangeOfCustomFormatState({ target: { name: idx, value } });
              };
              const handleDecrement = () => {
                const value = customFormatState[idx] - 1;
                onChangeOfCustomFormatState({ target: { name: idx, value } });
              };

              const outlinedInputProps = {
                type: 'number',
                onChange: onChangeOfCustomFormatState,
                name: `${idx}`,
                labelWidth,
                value: customFormatState[idx],
                endAdornment: isFocused ? (
                  <NumberAdornment
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    color={inputColor || colorInHexFormat}
                  />
                ) : null
              };

              return (
                <FormControl
                  variant={'outlined'}
                  key={name}
                  className={clsx(isFocused ? classes.textField : classes.textFieldUnfocused)}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                >
                  <InputLabel>{currentLabelName}</InputLabel>
                  <OutlinedInput {...outlinedInputProps} />
                </FormControl>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(InputsColorUtilsOfCustomColorPicker);
