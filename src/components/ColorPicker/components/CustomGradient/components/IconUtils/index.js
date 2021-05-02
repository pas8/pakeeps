import { Grid, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';
import BlurCircularOutlinedIcon from '@material-ui/icons/BlurCircularOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';

const useStyles = makeStyles(theme => ({
  containerOfGradientDirectionButtons: {
    marginLeft: theme.spacing(1.6),
    height: theme.spacing(8 * 0.92 - 0.32),
    '& button': {
      width: theme.spacing(8 - 1)
    }
  }
}));

const IconUtilsOfCustomGradient = () => {
  const classes = useStyles();
  const [gradientDirection, setGradientDirection] = useState('Linear');

  const handleGradientDirection = (placeholder, direction) => setGradientDirection(direction);

  return (
    <Grid>
      <ToggleButtonGroup
        className={classes.containerOfGradientDirectionButtons}
        onChange={handleGradientDirection}
        exclusive
        value={gradientDirection}
      >
        <ToggleButton value={'Linear'}>
          <BlurCircularOutlinedIcon />
        </ToggleButton>

        <ToggleButton value={'Radial'}>
          <ViewDayOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <CircularSlider
    min={0}
    max={360}
    direction={1}
    knobPosition={"right"}
    appendToValue={"°"}
    labelColor={"#005a58"}
    knobColor={"#005a58"}
    valueFontSize={"4rem"}
    // trackSize={24}

/>
    </Grid>
  );
};

IconUtilsOfCustomGradient.propTypes = {};

export default IconUtilsOfCustomGradient;
