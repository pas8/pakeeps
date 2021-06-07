import PropTypes from 'prop-types';
import { makeStyles, Button, Stepper, StepLabel, StepContent, Step, Grid, Box, Typography } from '@material-ui/core';
import { useCounter } from 'react-use';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useMix } from 'hooks/useMix.hook';

const useStyles = makeStyles(({ spacing }) => ({
  container: ({ customColor }) => {
    if (!customColor) return {};
    const customMixedColor = customColor?.secondaryColor;

    return {
      '& .Mui-disabled': {
        color: ({ customColor }) => customColor && useAlpha(customColor?.bgUnHover, 0.42)
      },
      '& .MuiSwitch-switchBase,.MuiFormControlLabel-label': {
        color: customMixedColor
      },
      '& .Mui-checked + .MuiSwitch-track,.MuiSwitch-track': {
        // background: customColor?.bgHover,
        background: customMixedColor
      },
      '& .MuiRadio-root': {
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

  buttonOfNextStep: {
    color: ({ customColor }) => customColor && customColor?.secondaryColor,
    '&:hover': {
      background: ({ customColor }) => customColor && useAlpha(customColor?.secondaryColor)
    }
  },
  buttonOfPriviousStep: {
   
    color: ({ customColor }) => customColor && useAlpha(customColor?.bgUnHover, 0.6),
    '&:hover': {
      background: ({ customColor }) => customColor && useAlpha(customColor?.bgUnHover)
    }
  },
 
  buttonContainer: {
    margin: spacing(0, 0, 0, 1),
    maxWidth: spacing(12),
    height: '100%',

    '& button': {
      float: 'right'
    }
  },
  componentContainer: {
    minWidth: spacing(28)
  }
}));
const SteperOfDialogOfAddNewLabel = ({ stepsArrOfDialogOfAddNewLabel, toNullityNewLabelState, customColor }) => {
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
    bgHover: useMix({ hover: customColor?.secondaryColor, bgHover: customColor?.unHover }, 0.8)
  };

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
                  <Grid>
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
                  <Grid>
                    <Grid container direction={'column'} justify={'center'} className={classes.buttonContainer}>
                      <Grid>
                        <Button
                          disabled={activeStep === 0}
                          onClick={() => decrimentActiveStep()}
                          size={'small'}
                          className={classes.buttonOfPriviousStep}
                        >
                          Back
                        </Button>
                      </Grid>
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
        <Box m={8} display={'flex'} flexDirection={'column'}>
          <Button onClick={() => decrimentActiveStep()} size={'small'}>
            Back
          </Button>
          <Button onClick={toReset} size={'small'} color={'secondary'}>
            Reset
          </Button>
        </Box>
      )}
    </Grid>
  );
};

SteperOfDialogOfAddNewLabel.propTypes = {
  stepsArrOfDialogOfAddNewLabel: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  })
};

export default SteperOfDialogOfAddNewLabel;
