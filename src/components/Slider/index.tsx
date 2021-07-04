import { Slider, withStyles, Grid, Typography, useTheme, InputBase, makeStyles } from '@material-ui/core';
import { ChangeEventHandler, FC, MouseEvent } from 'react';
import { SliderByPasPropsType } from './types';
import { useAlpha } from 'hooks/useAlpha.hook';
import NumberAdornment from 'components/ColorChanger/components/CustomColor/components/NumberAdornment';
import { useThemeColors } from 'hooks/useThemeColors.hook';

const StyledSlider = withStyles(({ palette: { secondary, background }, shape: { borderRadius }, spacing }) => ({
  root: {
    color: secondary.main,
    height: 4
    // marginBottom:spacing(0.4),
  },
  thumb: {
    height: 24,
    width: 24,
    border: '3px solid',
    borderColor: secondary.main,
    backgroundColor: background.default,
    marginTop: -10,
    // borderRadius,
    marginLeft: -12,
    // '&:focus, &:hover, &$active': {
    // },
    '&:hover': {
      boxShadow: `0px 0px 1px 10px ${useAlpha(secondary.main)}`
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 4,
    borderRadius
  },
  rail: {
    height: 4,
    borderRadius
  }
}))(Slider);

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  inputContainer: {
    overflow: 'hidden',
    width: spacing(8),
    borderRadius,
    marginLeft: '3%',
    border: '2px solid',
    borderColor: palette.secondary.main,
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none'
    },
    '& input': {
      marginLeft: spacing(1)
    },
    '& .MuiToggleButtonGroup-vertical': {
      // transform:'scale(0.92)'
    }
  },
  sliderContainer: {
    width: `calc(100% - 3% -  ${spacing(8)}px )`
  }
}));

const SliderByPas: FC<SliderByPasPropsType> = props => {
  const classes = useStyles();
  const [, secondaryColor] = useThemeColors();
  const onInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const value = !!props?.max && +e.target.value > props?.max ? props?.max : +e.target.value;
    !!props?.onChange && props?.onChange(e, value);
  };

  const handleIncrement = (e: any) => {
    const value = !!props?.value ? (!!props?.max && props?.value > props?.max ? props?.max : +props?.value + 1) : 0;
    !!props?.onChange && props?.onChange(e, value);
  };

  const handleDecrement = (e: any) => {
    const value = !!props?.value ? (!!props?.max && props?.value > props?.max ? props?.max : +props?.value - 1) : 0;

    !!props?.onChange && props?.onChange(e, value);
  };

  return (
    <Grid container alignItems={'center'}>
      <Grid container item className={classes.sliderContainer}>
        <StyledSlider {...props} />
      </Grid>
      <Grid className={classes.inputContainer}>
        <Typography color={'secondary'} variant={'subtitle1'}>
          <InputBase
            type={'number'}
            onChange={onInputChange}
            value={props.value}
            endAdornment={
              <NumberAdornment
                size={'small'}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                color={secondaryColor!}
              />
            }
          />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SliderByPas;
