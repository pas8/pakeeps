import { Icon } from '@material-ui/core';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(({ spacing, transitions, palette, shape: { borderRadius } }, l) => ({
  containerOfDateItem: ({ customColor }) => {
    const color = !customColor ? palette?.highEmphasis?.main : customColor?.hover;
    return {
      position: 'relative',
      padding: spacing(0.4 - 0.04, 0.8),
      margin: spacing(0.6, 0.6),
      border: '1px solid',
      borderColor: color,
      color,
      borderRadius: borderRadius
    };
  },

  containerOfFirstVariantOfEventItemView: {
    '& svg': {
      fontSize: spacing(2.4),
      margin: spacing(0, 0.8, 0, 0)
    }
  },

  iconContainer: {
    position: 'absolute',
    top: 0,
    left: spacing(0.8),
    bottom: 0,
    margin: spacing(0, 0.8, 0, 0),
    fontSize: spacing(2.16)
  }
}));
const EventItem = ({ icon, title, customColor, value,  isFirstVariantOfEventItemView }) => {
  const classes = useStyles({ customColor });
  return (
    <Grid className={classes.containerOfDateItem}>
      {isFirstVariantOfEventItemView ? (
        <Grid className={classes.containerOfFirstVariantOfEventItemView}>
          <Grid>
            <Typography variant={'body2'}>{title}</Typography>
          </Grid>

          <Grid container alignItems={'center'}>
            {icon} <Typography variant={'body1'}>{value}</Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid className={classes.iconContainer} container alignItems={'center'}>
            {icon}
          </Grid>
          <Box ml={4}>
            <Grid>
              <Typography variant={'body2'}>{title}</Typography>
            </Grid>
            <Grid>
              <Typography variant={'body2'}>{value}</Typography>
            </Grid>
          </Box>
        </>
      )}
    </Grid>
  );
};

EventItem.propTypes = {
  customColor: PropTypes.oneOf(['bool', 'object']),
  icon: PropTypes.any,
  title: PropTypes.string
};

export default EventItem;
