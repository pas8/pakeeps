import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { FC, ReactNode } from 'react';

const useStyles = makeStyles(
  ({ spacing, transitions, breakpoints, shape: { borderRadius }, palette: { secondary, background } }) => ({
    bg: ({ color }: { color: string }) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
      right: 0,
      zIndex: 0,
      // background:useAlpha(color,0.2),
      bottom: 0,
      '&:hover': {
        '& button': {
          borderColor: color
        }
      },
      '& p': {
        userSelect: 'none',
        // background:useAlpha(color,0.04),
        filter: 'blur(1px)',

        borderRadius,
        color: color,
        width: '300%',
        height: '300%',
        lineHeight: '32px',
        transform: 'rotate(42deg) translateX(-50%) translateY(0%)'
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
      }
    })
  })
);

const BackgroundPlaceholderByPas: FC<{
  title: string;
  color: string;
  buttonText?: string;
  isButtonHidden?: boolean;
  ButtonIcon?: ReactNode;
  size?: number;
  isButtonIconIsComponent?: boolean;
  onClick?: (e: any) => void;
  isButtonBig?: boolean;
}> = ({
  title,
  color,
  buttonText,
  ButtonIcon,
  isButtonHidden,
  onClick,
  size,
  isButtonIconIsComponent = false,
  isButtonBig = false
}) => {
  const bgTextArr = Array(size || 480).fill(title);

  const classes = useStyles({ color });

  return (
    <Grid className={classes.bg}>
      {!isButtonHidden && (
        <Button
          //@ts-ignore
          startIcon={ButtonIcon && isButtonIconIsComponent ? ButtonIcon : <ButtonIcon />}
          color={'secondary'}
          variant={'outlined'}
          onClick={onClick}
          size={'small'}
        >
          <Typography variant={isButtonBig ? 'subtitle1' : 'body2'} component={'h6'}>
            {buttonText}
          </Typography>
        </Button>
      )}
      <Typography variant={'body2'}>{bgTextArr}</Typography>
    </Grid>
  );
};

export default BackgroundPlaceholderByPas;
