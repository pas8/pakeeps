import { Icon } from '@material-ui/core';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { EventItemPropsType, UseStylesOfEventItemType } from './types';

const useStyles = makeStyles(({ spacing, transitions, palette, shape: { borderRadius } }) => ({
  containerOfDateItem: ({ customColor }: UseStylesOfEventItemType) => {
    const color = !customColor ? palette?.highEmphasis?.main : customColor?.hover;
    return {
      position: 'relative',
      padding: spacing(0.32, 0.8, 0.16, 0.8),
      margin: spacing(0.4, 0.4),
      border: '1px solid',
      borderColor: color,
      color,
      borderRadius: borderRadius
    };
  },

  containerOfFirstVariantOfEventItemView: {
    '& svg': {
      fontSize: spacing(2.16),
      margin: spacing(0, 0.4, 0.4, 0)
    }
  },

  iconContainer: {
    position: 'absolute',
    top: 0,
    left: spacing(0.8),
    bottom: 0,
    fontSize: spacing(2.16)
  }
}));

const EventItem: FC<EventItemPropsType> = ({ icon, title, customColor, value, isFirstVariantOfEventItemView }) => {
  const classes = useStyles({ customColor });
  return (
    <Grid className={classes.containerOfDateItem}>
      {isFirstVariantOfEventItemView ? (
        <Grid className={classes.containerOfFirstVariantOfEventItemView}>
          <Grid>
            <Typography variant={'caption'}>{title}</Typography>
          </Grid>

          <Grid container alignItems={'center'}>
            {icon} <Typography variant={'body2'}>{value}</Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid className={classes.iconContainer} container alignItems={'center'}>
            {icon}
          </Grid>
          <Box ml={4}>
            <Grid>
              <Typography variant={'caption'}>{title}</Typography>
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

export default EventItem;
