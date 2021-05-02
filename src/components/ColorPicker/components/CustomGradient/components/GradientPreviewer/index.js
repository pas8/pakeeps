import { Grid, makeStyles, Paper, Slider } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  previewer: {
    margin: theme.spacing(2, 0.4, 2),
    background: ({ gradientColor }) => gradientColor,
    width: theme.spacing(32 + 8),
    height: theme.spacing(8 * 0.8),
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)'
  }
}));

const GradientPreviewer = ({ gradientColor }) => {
  const classes = useStyles({ gradientColor });
  console.log(gradientColor)
  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];
  
  function valuetext(value) {
    return `${value}°C`;
  }

  
  return (
    <Paper  className={classes.previewer}>
        {/* <Slider
        // orientation="vertical"
        track={false}
        aria-labelledby="track-false-range-slider"
        getAriaValueText={valuetext}
        defaultValue={[20, 37, 50]}
        marks={marks}
      /> */}
    </Paper>
  );
};

GradientPreviewer.propTypes = {};

export default GradientPreviewer;
