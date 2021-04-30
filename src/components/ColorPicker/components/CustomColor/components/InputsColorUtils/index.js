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
  TextField
} from '@material-ui/core';
import { useState } from 'react';
import lchPlugin from 'colord/plugins/lch';
import { colord, extend } from 'colord';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '15ch'
  },
  containerOfInputsOfColorPicker: {
    '& > div': {
      width: '20ch',
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
  }
}));

const InputsColorUtilsOfCustomColorPicker = ({ color, setColor, customColorsInHexFormat }) => {
  extend([lchPlugin]);

  const classes = useStyles();

  const formatPropertiesArr = {
     rgb:{ maxLength: [255, 255, 255] },
    hsl:{maxLength: [360, 100, 100] },
    hsv:{maxLength: [360, 100, 100] },
    lch:{maxLength: [100, 132, 360] },
    
  }

  const [colorInHexFormat, setColorInHexFormat] = useState(customColorsInHexFormat);
  const [colorInCustomFormat, setColorInCustomFormat] = useState(customColorsInHexFormat);
  const [customFormatName, setCustomFormatName] = useState('rgb');
  const [customFormatState, setCustomFormatState] = useState({
    firstElement: '',
    secondElement: '',
    thirdElement: '',
    alfa: ''
  });

  console.log(color);
  const onChangeOfColorInHexFormat = ({ target: { value } }) => {
    if (value.length >= 3) setColor(value);
    setColorInHexFormat(value);
  };



  const inputInHexFormatProps = {
    labelText: 'Hex',
    maxLength: 8,
    type: 'text',
    ariaLabel: 'Enter pl a hex value',
    value: colorInHexFormat,
    maxValue: 'any',
    onChange: onChangeOfColorInHexFormat,
    hexFormat: true
  }


const currentCustomFormatInputsGroup = formatPropertiesArr[customFormatName]

  return (
    <Grid className={classes.containerOfInputsOfColorPicker}>
      {currentCustomFormatInputsGroup.maxLength.map((maxLength) => {



        const groupButtonsOfNumberInputOfEndAdornment = (
          <InputAdornment position={'end'} className={classes.inputAdornmentArrowContainer}>
            <ToggleButtonGroup orientation={'vertical'} value={'null'} exclusive size={'small'}>
              <ToggleButton value={'plus'} aria-label={'plus one'}>
                <AddOutlinedIcon />
              </ToggleButton>
              <ToggleButton value={'minus'} aria-label={'minus one'}>
                <RemoveOutlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </InputAdornment>
        );

        const outlinedInputProps = {
          type:'number',
          onChange,
          labelWidth: labelText.length * 9.6,
          value,
          endAdornment:!hexFormat  &&  groupButtonsOfNumberInputOfEndAdornment
        };

        return (
          <FormControl variant={'outlined'} className={clsx(classes.textField)}>
            <InputLabel>{labelText}</InputLabel>
            <OutlinedInput {...outlinedInputProps} />
          </FormControl>
        );
      })}
      <FormControl variant={'outlined'} className={clsx(classes.textField)}>
            <InputLabel>Hex</InputLabel>
            <OutlinedInput {...inputInHexFormatProps} />
          </FormControl>

    </Grid>
  );
};

export default InputsColorUtilsOfCustomColorPicker;
