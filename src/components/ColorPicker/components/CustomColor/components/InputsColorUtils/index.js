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
import { useEffect, useState } from 'react';
import lchPlugin from 'colord/plugins/lch';
import { colord, extend } from 'colord';
import _, { sum } from 'lodash';



const useStyles = makeStyles(theme => ({
  textFieldInHexFormat: {
    width: theme.spacing(8 + 4 + 2),
    marginRight: theme.spacing(1.4 + 4)
  },
  removeMarginFromTextFieldInHexFormat: {
    width: theme.spacing(8 + 4 + 2),
    marginRight: theme.spacing(1.4 )
  },
  textField: {
    width: theme.spacing(12),
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
    gap: theme.spacing(1.4)
  }
}));

const InputsColorUtilsOfCustomColorPicker = ({ color, setColor, customColorsInHexFormat }) => {
  extend([lchPlugin]);
  const classes = useStyles();




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

  const customFormatElementNames = ['first', 'second', 'third', 'alpha'];
  const sumReduceFunc = (sum, name) => ({ ...sum, [name]: '' });
  const nullityValueOfCustomFormatState = _.reduce(customFormatElementNames, sumReduceFunc, '');

  const [colorInHexFormat, setColorInHexFormat] = useState(customColorsInHexFormat);
  const [colorInCustomFormat, setColorInCustomFormat] = useState(customColorsInHexFormat);
  const [customFormatName, setCustomFormatName] = useState('rgb');
  const [customFormatState, setCustomFormatState] = useState(nullityValueOfCustomFormatState);
  const [customFormatElementFocusStatus, setCustomFormatElementFocus] = useState(false);

  // console.log(customFormatState);

  const onChangeOfColorInHexFormat = ({ target: { value } }) => {
    if (value.length >= 3) setColor(value);
    setColorInHexFormat(value);
  };

  console.log(color)
  const onChangeOfCustomFormatState = ({ target: { value, name:idx } }) => {
    // switch (name) {
    //   case value:
    //   default:
    //     return name
    // }

    console.log(value, customFormatElementNames[idx]);
  };

  useEffect(() => console.log(colorInHexFormat), [colorInHexFormat]);

  const inputInHexFormatProps = {
    labelText: 'Hex',
    maxLength: 8,
    type: 'text',
    ariaLabel: 'Enter pl a hex value',
    value: colorInHexFormat,
    maxValue: 'any',
    onChange: onChangeOfColorInHexFormat,
    hexFormat: true,
    labelWidth: 3 * 9.6,
    name: 'hex'
  };

  const currentCustomFormatInputsGroupArr = _.concat(formatPropertiesArr[customFormatName], alphaColorCanalProperty);
  const preventDefaultFunc = (e) =>   e.preventDefault();
  
  const onInputFocus = ({ target: { name } }) => setCustomFormatElementFocus(name);
  const onButtonClick = (name) =>console.log(name)
  const onInputBlur = () => setCustomFormatElementFocus(false);
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
            const onClick =  ()=>onButtonClick(name)
            const groupButtonsOfNumberInputOfEndAdornment = (
              <InputAdornment position={'end'} className={classes.inputAdornmentArrowContainer}>
                <ToggleButtonGroup orientation={'vertical'} value={'null'} exclusive size={'small'}>
                  <ToggleButton value={'plus'} aria-label={'plus one'} onClick={onClick}  onMouseDown={preventDefaultFunc}>
                    <AddOutlinedIcon />
                  </ToggleButton>
                  <ToggleButton value={'minus'} aria-label={'minus one'}  onMouseDown={preventDefaultFunc}>
                    <RemoveOutlinedIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </InputAdornment>
            );

            const outlinedInputProps = {
              type: 'number',
              onChange: onChangeOfCustomFormatState,
              name: idx,
              labelWidth: currentLabelName.length * 9.6,
              value: customFormatState[name],
              endAdornment: isFocused ? groupButtonsOfNumberInputOfEndAdornment : null
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
