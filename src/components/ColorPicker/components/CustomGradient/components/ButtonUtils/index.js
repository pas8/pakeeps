import { Box, FormControl, Grid, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';
import BlurCircularOutlinedIcon from '@material-ui/icons/BlurCircularOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import CenteredGrid from 'components/CenteredGrid';
import NumberAdornment from 'components/ColorPicker/components/CustomColor/components/NumberAdornment';

const useStyles = makeStyles(theme => ({
  containerOfGradientDirectionButtons: {
    marginLeft: theme.spacing(1.6),
    height: theme.spacing(8 * 0.92 - 0.32),
    '& button': {
      width: theme.spacing(8 - 1)
    }
  },
  containerOfCircleSlider: {
    // transform: 'scale(0.16)',
    // width: theme.spacing(8),
    // height: theme.spacing(8)
  },
  inputOfGradientAngle: {
    width: theme.spacing(10),
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ color }) => color
    }
  }
}));

const ButtonUtilsOfCustomGradient = ({ color }) => {
  const classes = useStyles({ color });
  const [gradientDirection, setGradientDirection] = useState('Linear');
  const [hoverStatusOFCircleSlider, setHoverStatusOFCircleSlider] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(180);
  const handleGradientDirection = (placeholder, direction) => setGradientDirection(direction);

  const setHoverStatusOFCircleSliderIsFalse = () => setHoverStatusOFCircleSlider(false);
  const setHoverStatusOFCircleSliderIsTrue = () => setHoverStatusOFCircleSlider(true);
  // console.log(hoverStatusOFCircleSlider);

  const handleChangeOfCircleSlider = value => setGradientAngle(value);
  const handleChangeOfGradientAngleInput = ({ target: { value } }) => setGradientAngle(value);

  const gradientAngleInputProps = {
    type: 'number',
    onChange: handleChangeOfGradientAngleInput,
    name: 'gradientAngle',
    value: gradientAngle,
    endAdornment: <NumberAdornment setStateFunc={setGradientAngle}  />
  };

  const circleSliderProps = {
    onChange: handleChangeOfCircleSlider,
    min: 0,
    max: 360,
    direction: 1,
    label: '',
    appendToValue: '°',
    knobColor: color,
    trackSize: 2,
    knobSize: 24,
    dataIndex: gradientAngle,
    valueFontSize: '0rem',
    width: 42 + 4,
    trackColor: `rgba(255,255,255,0.${hoverStatusOFCircleSlider ? 8 : 2})`
  };
  return (
    <Grid container>
      <Grid item>
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
      </Grid>
      <Box ml={1.8}>
        <Grid container>
          <Box
            className={classes.containerOfCircleSlider}
            onMouseEnter={setHoverStatusOFCircleSliderIsTrue}
            onMouseLeave={setHoverStatusOFCircleSliderIsFalse}
            mr={2.8}
          >
            <CenteredGrid>
              <CircularSlider {...circleSliderProps}>0</CircularSlider>
            </CenteredGrid>
          </Box>
          <FormControl variant={'outlined'} className={classes.inputOfGradientAngle}>
            <OutlinedInput {...gradientAngleInputProps} />
          </FormControl>
        </Grid>
      </Box>
    </Grid>
  );
};

ButtonUtilsOfCustomGradient.propTypes = {};

export default ButtonUtilsOfCustomGradient;
