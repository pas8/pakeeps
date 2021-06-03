import { Grid, makeStyles, Paper, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { colord } from 'colord';
import PinOutlinedIcon from 'components/Icons/components/PinOutlinedIcon';
import PinIcon from 'components/Icons/components/PinIcon';

const useStyles = makeStyles(({ spacing, palette }) => ({
  title: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: spacing(1.4),
    marginBottom: spacing(0.8)
  },
  containerOfPinIcon: ({ customColor }) => ({
    position: 'absolute',
    top: spacing(0.42),
    right: spacing(0.2),

    color: customColor ? customColor.unHover : palette?.mediumEmphasis?.main,
    '&:hover': {
      background: colord(customColor ? customColor.hover : palette?.highEmphasis?.main)
        .alpha(0.16)
        .toHex(),
      color: customColor ? customColor.hover : palette?.highEmphasis?.main
    }
  })
}));

const MainDefaultPartOfPakeepElement = ({
  children,
  isPinIconButtonHidden,
  className,
  onClickOfPinIconButton,
  text,
  title,
  customColor
}) => {
  const classes = useStyles({ customColor });

  return (
    <Paper variant={'outlined'} className={className}>
      {!isPinIconButtonHidden && (
        <IconButton className={classes.containerOfPinIcon} onClick={onClickOfPinIconButton}>
          {customColor ? <PinIcon /> : <PinOutlinedIcon />}
        </IconButton>
      )}
      <Grid className={classes.title}>
        <Typography variant={'h5'}>{title}</Typography>
      </Grid>
      <Grid className={classes.text}>
        <Typography variant={'body2'} component={'p'}>
          {text}
        </Typography>
      </Grid>
      {children}
    </Paper>
  );
};

MainDefaultPartOfPakeepElement.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  isPinIconButtonHidden: PropTypes.bool,
  onClickOfPinIconButton: PropTypes.func,
  text: PropTypes.any,
  title: PropTypes.string
};

export default MainDefaultPartOfPakeepElement;
