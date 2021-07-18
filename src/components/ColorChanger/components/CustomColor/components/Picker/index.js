import { Grid, makeStyles } from '@material-ui/core';
import { isString } from 'lodash';
import { colord } from 'colord';
import { RgbaColorPicker } from 'react-colorful';

const useStyles = makeStyles(theme => ({
  containerOfPickerByPas: ({ isExtended, gradientColorStateLength, gradientStatus }) => ({
    '& .react-colorful': {
      width: 'auto',
      minWidth: theme.spacing(42 - 10 - 1.4),
      minHeight: gradientColorStateLength ? theme.spacing(4 * 9.6) : 'auto',
      height: gradientStatus
        ? theme.spacing(gradientColorStateLength * (8 + 1))
        : isExtended
        ? theme.spacing(42)
        : theme.spacing(42 - 10 + 0.8)
      // marginRight: theme.spacing(10 + 0.16),
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
      width: theme.spacing(2.8 - 0.16),
      height: theme.spacing(2.8 - 0.16),
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 0,
      boxShadow: '0 0 0 2px rgba(255, 255, 255,0.8),0 0 0 4px rgba(32,32,32,0.8)',

      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex
      }),
      '&:hover': {
        boxShadow: '0 0 0 2px rgba(255, 255, 255,1),0 0 0 4px rgba(32,32,32,1)'
      }
    },
    '& .react-colorful__hue': { order: 1 },
    '& .react-colorful__hue,.react-colorful__alpha ': {
      borderRadius: theme.spacing(0.8),
      margin: theme.spacing(2, 0),
      height: theme.spacing(2)
    },

    '& .react-colorful__alpha': {
      order: -2,
      display: isExtended ? 'block' : 'none',

      transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.complex
      })
    }
    // marginRight: theme.spacing(-1)
  })
}));

const PickerByPas = ({
  setPickerColor,
  color,
  isExtended = false,
  gradientColorStateLength = false,
  gradientStatus = false
}) => {
  const classes = useStyles({ isExtended, gradientColorStateLength, gradientStatus });

  const isColorInHexFormat = isString(color) && color.startsWith('#');
  const colorToRgbFormat = colord(color).toRgb();
  const correctAndFormattedColor = isColorInHexFormat ? colorToRgbFormat : color;

  return (
    <Grid className={classes.containerOfPickerByPas}>
      <RgbaColorPicker color={correctAndFormattedColor} onChange={setPickerColor} />
    </Grid>
  );
};


export default PickerByPas;
