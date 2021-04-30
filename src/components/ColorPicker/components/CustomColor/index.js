import PropTypes from 'prop-types';
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
import { colord } from 'colord';
import { RgbaColorPicker } from 'react-colorful';
import { themeColors } from 'components/theme';
import clsx from 'clsx';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
const useStyles = makeStyles(theme => ({
  containerOfCustomColor: ({ transparencyStatus }) => ({
    '& .react-colorful': {
      padding: theme.spacing(0, 1),
      width: 'auto',
      minWidth: theme.spacing(42 - 8 - 0.8),
      paddingTop: transparencyStatus ? 0 : theme.spacing(1.4),
      height: theme.spacing(42 - 10 + 1.2)
    },

    '& .react-colorful__saturation': {
      borderRadius: theme.spacing(0.8),
      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    '& .react-colorful__pointer': {
      borderRadius: theme.spacing(0.8),
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: '3px solid rgba(255, 255, 255,0.8)',
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex
      }),
      '&:hover': {
        borderColor: 'rgba(255, 255, 255,0.96)'
      }
    },

    '& .react-colorful__hue,.react-colorful__alpha ': {
      borderRadius: theme.spacing(0.8),
      margin: theme.spacing(2, 0),
      height: theme.spacing(2)
    },
    '& .react-colorful__hue-pointer,.react-colorful__alpha-pointer': {
      //  borderWidth: '5px'
    },
    '& .react-colorful__alpha': {
      order: -1,
      display: transparencyStatus ? 'block' : 'none',

      transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.complex
      })
    }
  }),
  containerOfInputsOfColorPicker: {
    '& > div': {
      width: '20ch',
      ' & input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none'
      }
    }
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: '25ch'
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

const CustomColor = ({ color, setColor, transparencyStatus, nullityColor = '#fff', setTransparencyStatus }) => {
  const classes = useStyles({ transparencyStatus: true });
  const isColorInHexFormat = _.isString(color, nullityColor) && color.startsWith('#');
  const colorInRgbFormat = colord(color).toRgb();

  const correctAndFormattedColor =
    _.isEqual(color, 'rgba(255,255,255,0.8)') && !transparencyStatus
      ? colord(themeColors.primaryMain).toRgb()
      : isColorInHexFormat
      ? colorInRgbFormat
      : color;

  return (
    <Grid className={classes.containerOfCustomColor}>
      <RgbaColorPicker color={correctAndFormattedColor} onChange={setColor} />
      <Grid className={classes.containerOfInputsOfColorPicker}>
        <FormControl variant={'outlined'} className={clsx(classes.margin, classes.textField)}>
          <InputLabel>Hex</InputLabel>
          <OutlinedInput
            type={'text'}
            labelWidth={32}
            endAdornment={
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
            }
          />
        </FormControl>
        <TextField type={'number'} variant={'outlined'} />
        <TextField type={'number'} variant={'outlined'} />
        <TextField type={'number'} variant={'outlined'} />
      </Grid>
    </Grid>
  );
};

CustomColor.propTypes = {
  color: PropTypes.shape({
    startsWith: PropTypes.func
  }),
  nullityColor: PropTypes.string,
  setColor: PropTypes.func,
  setTransparencyStatus: PropTypes.func,
  transparencyStatus: PropTypes.bool
};

export default CustomColor;
