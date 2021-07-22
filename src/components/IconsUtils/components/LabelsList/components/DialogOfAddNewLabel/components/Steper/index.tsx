import { makeStyles, Button, Stepper, StepLabel, StepContent, Step, Grid, Box, Typography } from '@material-ui/core';
import { useCounter, useMeasure } from 'react-use';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useMix } from 'hooks/useMix.hook';
import { FC } from 'react';
import { SteperOfDialogOfAddNewLabelPropsType, UseStylesOfSteperOfDialogOfAddNewLabelType } from './types';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

const useStyles = makeStyles(({ spacing, breakpoints, palette }) => ({
  container: ({ customColor }: UseStylesOfSteperOfDialogOfAddNewLabelType) => {
    const defaultStyles = {
      '& .MuiStepper-root': {
        width: '100%'
      },
      '&  .Mui-checked +.MuiFormControlLabel-label  ': {
        color: palette.secondary.main
      }
    };
    if (customColor.isUseDefault) return defaultStyles;
    const customMixedColor = customColor?.secondaryColor;

    return {
      ...defaultStyles,
      '& .Mui-disabled': {
        color: useAlpha(customColor?.bgUnHover, 0.42)
      },
      // '& .MuiSwitch-switchBase,.MuiFormControlLabel-label': {
      //   color: customMixedColor
      // },
      // '& .Mui-checked + .MuiSwitch-track,.MuiSwitch-track': {
      //   // background: customColor?.bgHover,
      //   background: customMixedColor
      // },
      '& .MuiRadio-root': {
        color: customColor.bgUnHover,
        '&:hover': {
          background: useAlpha(customColor.bgUnHover)
        }
      },
      '&  .Mui-checked +.MuiFormControlLabel-label  ': {
        color: customMixedColor
      },
      '&  .Mui-checked': {
        color: customMixedColor,
        '&:hover': {
          background: useAlpha(customMixedColor)
        }
      },

      ' & .MuiStepLabel-labelContainer span': {
        color: customColor?.bgUnHover
      },
      '& .MuiCollapse-wrapperInner': {
        display: 'flex',
        alignItems: 'center'
      },
      '& .MuiStepIcon-root': {
        color: customColor?.bgUnHover,
        '& text': {
          fill: customColor?.unHover
        }
      }
    };
  },

  buttonOfNextStep: ({ customColor }: UseStylesOfSteperOfDialogOfAddNewLabelType) => ({
    color: !customColor.isUseDefault ? customColor?.secondaryColor : '',
    '&:hover': {
      background: !customColor.isUseDefault ? useAlpha(customColor?.secondaryColor) : ''
    }
    //     [breakpoints.down('xs')]: {
    // border:'1px solid',
    // borderColor:!customColor.isUseDefault ? customColor?.secondaryColor : '',
    //     },
  }),
  buttonOfPriviousStep: ({ customColor }: UseStylesOfSteperOfDialogOfAddNewLabelType) => ({
    color: !customColor.isUseDefault ? useAlpha(customColor?.bgUnHover, 0.6) : '',
    '&:hover': {
      background: !customColor.isUseDefault ? useAlpha(customColor?.bgUnHover) : ''
    }
  }),

  buttonContainer: ({ customColor }: UseStylesOfSteperOfDialogOfAddNewLabelType) => ({
    margin: spacing(0, 0, 0, 1),
    maxWidth: spacing(12),
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      margin: spacing(0, 0, 0, 1),

      width: '100%'
    },
    // background: !customColor.isUseDefault ? customColor?.hover : '',

    height: '100%',

    '& button': {
      float: 'right'
    }
  }),
  componentContainer: {
    minWidth: spacing(28)
  }
}));
const SteperOfDialogOfAddNewLabel: FC<SteperOfDialogOfAddNewLabelPropsType> = ({
  stepsArrOfDialogOfAddNewLabel,
  toNullityNewLabelState,
  customColor
}) => {
  const classes = useStyles({ customColor });

  const [activeStep, { inc: incrementActiveStep, dec: decrimentActiveStep, set: setActiveStep, reset }] = useCounter(0);

  const isStepLast = activeStep === stepsArrOfDialogOfAddNewLabel.length - 1;
  const isFinished = activeStep === stepsArrOfDialogOfAddNewLabel.length;

  const toReset = () => {
    toNullityNewLabelState();
    reset();
  };

  const secondaryCustomColor = {
    ...customColor,
    bgUnHover: customColor?.secondaryColor,
    bgHover: useMix({ ...customColor, hover: customColor?.secondaryColor, bgHover: customColor?.unHover }, 0.8)
  };

  const { isSizeSmall, isSiveIsXs } = useBreakpointNames();

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <Grid className={classes.container} container alignItems={'center'}>
      <Stepper activeStep={activeStep} orientation={'vertical'}>
        {stepsArrOfDialogOfAddNewLabel.map(
          (
            {
              title,
              Component,
              componentProps,
              isAdditionalComponentHidden = true,
              AdditionalComponent,
              additionalComponentProps
            },
            idx
          ) => (
            <Step key={title}>
              <StepLabel>
                <Grid onClick={() => setActiveStep(idx)} style={{ cursor: 'pointer' }}>
                  {title}
                </Grid>
              </StepLabel>
              <StepContent>
                <Grid container alignItems={'center'}>
                  <Grid style={{ width: `calc(100% - ${width}px)` }}>
                    <Grid direction={'column'}>
                      <Grid container className={classes.componentContainer} alignItems={'center'}>
                        <Component {...componentProps} customColor={secondaryCustomColor} />
                      </Grid>
                      <Grid>
                        {!isAdditionalComponentHidden && (
                          <AdditionalComponent {...additionalComponentProps} customColor={secondaryCustomColor} />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid ref={ref}>
                    <Grid
                      container
                      direction={isSizeSmall ? 'column' : 'column'}
                      // justify={isSizeSmall ? 'flex-end' : 'center'}
                      className={classes.buttonContainer}
                    >
                      <Box mb={0.4}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={() => decrimentActiveStep()}
                          size={'small'}
                          className={classes.buttonOfPriviousStep}
                        >
                          Back
                        </Button>
                      </Box>
                      <Grid>
                        <Button
                          color={'secondary'}
                          onClick={() => incrementActiveStep()}
                          size={'small'}
                          className={classes.buttonOfNextStep}
                        >
                          {isStepLast ? 'Finish' : 'Next'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
          )
        )}
      </Stepper>
      {isFinished && (
        <Box m={isSizeSmall ? 2 : 8} display={'flex'} flexDirection={isSizeSmall ? 'row' : 'column'}>
          <Button onClick={() => decrimentActiveStep()} size={'small'} className={classes.buttonOfPriviousStep}>
            Back
          </Button>
          <Button onClick={toReset} size={'small'} color={'secondary'} className={classes.buttonOfNextStep}>
            Reset
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default SteperOfDialogOfAddNewLabel;
