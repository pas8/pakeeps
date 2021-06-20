import { Grid, makeStyles, Paper, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { colord } from 'colord';
import PinOutlinedIcon from 'components/Icons/components/PinOutlinedIcon';
import PinIcon from 'components/Icons/components/PinIcon';
import { FC } from 'react';
import { MainDefaultPartOfPakeepElementPropsType, UseStylesOfMainDefaultPartOfPakeepElementType } from './types';

const useStyles = makeStyles(({ spacing, palette: { highEmphasis, mediumEmphasis } }) => ({
  titleClass: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: spacing(1.4),
    marginBottom: spacing(0.8)
  },
  containerOfPinIconClass: ({ customColor }: UseStylesOfMainDefaultPartOfPakeepElementType) => ({
    position: 'absolute',
    top: spacing(0.42),
    right: spacing(0.2),

    color: customColor ? customColor.unHover : mediumEmphasis?.main,
    '&:hover': {
      background: colord(!customColor.isUseDefault ? customColor.hover : highEmphasis ? highEmphasis.main : '')
        .alpha(0.16)
        .toHex(),
      color: customColor ? customColor.hover : highEmphasis?.main
    }
  })
}));

const MainDefaultPartOfPakeepElement: FC<MainDefaultPartOfPakeepElementPropsType> = ({
  children,
  isPinIconButtonHidden,
  className,
  onClickOfPinIconButton,
  text,
  title,
  customColor,
  onClick
}) => {
  const classes = useStyles({ customColor });

  return (
    <Paper variant={'outlined'} className={className}>
      {!isPinIconButtonHidden && (
        <IconButton className={classes.containerOfPinIconClass} onClick={onClickOfPinIconButton}>
          {customColor ? <PinIcon /> : <PinOutlinedIcon />}
        </IconButton>
      )}
      <Grid onClick={onClick}>
        <Grid className={classes.titleClass}>
          <Typography variant={'h5'}>{title}</Typography>
        </Grid>
        <Grid>
          <Typography variant={'body2'} component={'p'}>
            {text}
          </Typography>
        </Grid>
      </Grid>
      {children}
    </Paper>
  );
};

export default MainDefaultPartOfPakeepElement;
