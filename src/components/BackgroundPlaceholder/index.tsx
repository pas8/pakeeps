import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { FC, ReactNode } from 'react';

const useStyles = makeStyles(
  ({
    spacing,
    transitions,
    breakpoints,
    palette: { secondary, maxEmphasis, background, highEmphasis, mediumEmphasis }
  }) => ({
    bg: ({ color }: { color: string }) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
      borderRadius: 16,
      right: 0,
      zIndex: 0,
      bottom: 0,

      '& p': {
        userSelect: 'none',
        color: color,
        width: '200%',
        height: '300%',
        lineHeight: '32px',
        transform: 'rotate(42deg) translateX(-42%) translateY(-8%)'
      },
      '& button': {
        background: background.default,
        zIndex: 10,
        '&:hover': {
          background: background.default
        },
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
      },
      '& svg': {
        margin: spacing(0, -0.4, 0, 0)
      },
    })
  })
);

const BackgroundPlaceholderByPas: FC<{
  title: string;
  color: string;
  buttonText?: string;
  isButtonHidden?: boolean;
  ButtonIcon?: ReactNode;
}> = ({ title, color, buttonText, ButtonIcon, isButtonHidden }) => {
  const bgTextArr = Array(400).fill(title);

  const classes = useStyles({ color });

  return (
    <Grid className={classes.bg}>
      {!isButtonHidden && (
        <Button
          //@ts-ignore
          startIcon={ButtonIcon && <ButtonIcon />}
          color={'secondary'}
          variant={'outlined'}
          size={'small'}
        >
          <Typography variant={'body2'} component={'h6'}>{buttonText}</Typography>
        </Button>
      )}
      <Typography variant={'body2'}>{bgTextArr}</Typography>
    </Grid>
  );
};

export default BackgroundPlaceholderByPas;
