import PropTypes from 'prop-types';
import {
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  TextField
} from '@material-ui/core';
import { colord } from 'colord';
import { RgbaColorPicker } from 'react-colorful';
import { themeColors } from 'components/theme';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CustomGradient from '../CustomGradient';
import GradientPreviewer from '../CustomGradient/components/GradientPreviewer';
import InputsColorUtilsOfCustomColorPicker from './components/InputsColorUtils';

const useStyles = makeStyles(theme => ({
  containerOfCustomColor: ({ transparencyStatus }) => ({
    '& .react-colorful': {
      padding: theme.spacing(0, 1),
      width: 'auto',
      minWidth: theme.spacing(42 + 8 - 1),
      paddingTop: transparencyStatus ? 0 : theme.spacing(1.4),
      height: theme.spacing(42 + 0.8)
      // marginRight: theme.spacing(10 + 0.16)
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
  })
}));

const CustomColor = ({
  color,
  setColor,
  transparencyStatus,
  nullityColor = '#fff',
  setTransparencyStatus,
  customColorsInHexFormat,
  customFormatName
}) => {
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
      <Grid container>
        <Grid item>
          <Grid container>
            <RgbaColorPicker color={correctAndFormattedColor} onChange={setColor} />
            <Grid item>
            <GradientPreviewer color={customColorsInHexFormat} />

              <CustomGradient />
            </Grid>
          </Grid>
          <Grid item>
            <InputsColorUtilsOfCustomColorPicker
              color={color}
              setColor={setColor}
              customColorsInHexFormat={customColorsInHexFormat}
              customFormatName={customFormatName}
            />
          </Grid>
        </Grid>
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
