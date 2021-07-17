import { FC } from 'react';
import { makeStyles, Grid, Button, Typography, useTheme } from '@material-ui/core';
import { colord } from 'colord';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { ButtonOfSignInProviderPropsType, UseStylesOfButtonOfSignInProviderType } from './types';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, typography: { h6 }, palette }) => ({
  container: ({ color, notValidatedColor }: UseStylesOfButtonOfSignInProviderType & { notValidatedColor: string }) => ({
    position: 'relative',
    // marginBottom: spacing(1.2),
    width: '100%',
    // height:'100%',
    height: spacing(8),
    borderRadius,
    cursor: 'pointer',
    border: '2px solid',
    overflow: 'hidden',
    borderColor: useAlpha(color, 0.6),
    background: useAlpha(notValidatedColor, 0.6),

    '&:hover': {
      background: useAlpha(notValidatedColor, 0.92),

      borderColor: useAlpha(color, 1),
      '& p': {
        color: notValidatedColor
      },
      '& .MuiTouchRipple-root': {
        background: useAlpha(color, 0.08)
      },
      '& button': {
        borderColor: color,
        background: palette.background.default
      }
    },
    '& button': {
      color,
      zIndex: 1000,
      position: 'relative',
      // width: '68%',
      '& .MuiButton-startIcon': {
        // top: 0,
        // left: '4%',
        // position: 'absolute',
        // bottom: 0
      },
      background: palette.background.default,
      borderColor: useAlpha(color, 0.42)
    },
    ' & p': {
      position: 'absolute',
      top: 0,
      transform: 'rotate(42deg) translateX(-42%) translateY(-20%)',
      filter: 'blur(2px)',
      width: '160%',
      height: '1000%',
      color: useAlpha(palette.text.disabled, 0.2),
      left: 0,
      right: 0,
      bottom: 0
    }
  }),

  buttonContainer: ({ color }:UseStylesOfButtonOfSignInProviderType) => ({
    '& button': {
      width: '100%',

      height: spacing(6),
      borderColor: useAlpha(color, 0.4),
      color,
      '&:hover': {
        borderColor: color
      }
    }
  })
}));

const ButtonOfSignInProvider: FC<ButtonOfSignInProviderPropsType> = ({
  onClick,
  color: notValidatedColor,
  name,
  isProvidersButtonHaveCustomView = false,
  isProvider = true
}) => {
  const [icon] = useTakeIcon(name);
  const {
    palette: { type }
  } = useTheme();
  const color =
    type === 'dark' ? colord(notValidatedColor).lighten(0.16).toHex() : colord(notValidatedColor).darken(0.16).toHex();
  const classes = useStyles({ color, notValidatedColor });

  const textArr = Array(400).fill(`${name} & `);
  return (
    <>
      {isProvidersButtonHaveCustomView ? (
        <Grid className={classes.container} onClick={onClick} alignItems={'center'} justify={'center'} container>
          <Button startIcon={icon} variant={'outlined'}>{`${isProvider ? 'Sign In with' : ''} ${name}`}</Button>
          <Typography component={'p'}>{textArr}</Typography>
        </Grid>
      ) : (
        <Grid key={name} container item alignItems={'center'} justify={'center'} className={classes.buttonContainer}>
          <Button onClick={onClick} variant={'outlined'} startIcon={icon}>
            Sign in with {name}
          </Button>
        </Grid>
      )}
    </>
  );
};

export default ButtonOfSignInProvider;
