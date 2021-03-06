import { Box, FormControl, Grid, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';
import BlurCircularOutlinedIcon from '@material-ui/icons/BlurCircularOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import CenteredGrid from 'components/CenteredGrid';
import NumberAdornment from 'components/ColorChanger/components/CustomColor/components/NumberAdornment';
import ExposurePlus1OutlinedIcon from '@material-ui/icons/ExposurePlus1Outlined';
import { useThemeColors } from 'hooks/useThemeColors.hook';

const useStyles = makeStyles(({ spacing }) => ({
  containerOfGradientDirectionButtons: {
    marginLeft: spacing(1.6),
    height: spacing(8 * 0.92 - 0.32),
    '& button': {
      width: spacing(8 - 1)
    }
  },
  containerOfCircleSlider: {
    // transform: 'scale(0.16)',
    // width: theme.spacing(8),
    // height: theme.spacing(8)
    '& > div': {
      // width: '20ch',
      ' & input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none'
      }
    }
  },
  inputOfGradientAngle: {
    marginLeft: spacing(-0.4),
    width: spacing(10),
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ color, colorPreview, maxEmphasisColor }) => (colorPreview ? color : maxEmphasisColor)
    }
  }
}));

const ButtonUtilsOfCustomGradient = ({
  color,
  gradientDirection,
  setGradientDirection,
  gradientAngle,
  setGradientAngle,
  colorPreview
}) => {
  const [primaryColor, , maxEmphasisColor, highEmphasisColor, mediumEmphasisColor] = useThemeColors();

  const classes = useStyles({ color, colorPreview, maxEmphasisColor });

  const [hoverStatusOFCircleSlider, setHoverStatusOFCircleSlider] = useState(false);

  const handleGradientDirection = (placeholder, direction) => direction && setGradientDirection(direction);

  const setHoverStatusOFCircleSliderIsFalse = () => setHoverStatusOFCircleSlider(false);
  const setHoverStatusOFCircleSliderIsTrue = () => setHoverStatusOFCircleSlider(true);
  // console.log(hoverStatusOFCircleSlider);

  const handleChangeOfCircleSlider = value => setGradientAngle(value);
  const handleChangeOfGradientAngleInput = ({ target: { value } }) => {
    setGradientAngle(value);
  };

  const gradientAngleInputProps = {
    type: 'number',
    onChange: handleChangeOfGradientAngleInput,
    name: 'gradientAngle',
    value: gradientAngle,
    endAdornment: <NumberAdornment setStateFunc={setGradientAngle} />
  };

  const circleSliderProps = {
    onChange: handleChangeOfCircleSlider,
    min: 0,
    max: 360,
    direction: 1,
    label: '',
    appendToValue: '??',
    knobColor: colorPreview ? color : maxEmphasisColor,
    trackSize: 2,
    knobSize: 24,
    dataIndex: gradientAngle,
    valueFontSize: '0rem',
    width: 42 + 8,
    trackColor: hoverStatusOFCircleSlider ? maxEmphasisColor : mediumEmphasisColor
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
          <ToggleButton value={'radial-gradient'}>
            <BlurCircularOutlinedIcon />
          </ToggleButton>

          <ToggleButton value={'linear-gradient'}>
            <ViewDayOutlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {gradientDirection === 'linear-gradient' && (
        <Box ml={1.8}>
          <Grid container className={classes.containerOfCircleSlider}>
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
      )}
      <ToggleButtonGroup className={classes.containerOfGradientDirectionButtons} exclusive>
        <ToggleButton value={'linear-gradient'}>
          {/* <ExposurePlus1OutlinedIcon /> */}
          <Box fontWeight={900}>
            <Typography variant={'h5'}> +1</Typography>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
};

ButtonUtilsOfCustomGradient.propTypes = {};

export default ButtonUtilsOfCustomGradient;
