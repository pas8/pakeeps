import { Grid, makeStyles,Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { find } from 'lodash';
import PropTypes from 'prop-types';

const useStyles = makeStyles(({ spacing, transitions, palette, shape: { borderRadius } }) => ({
  containerOfDateItem: ({ customColor }) => {
    const color = !customColor ? palette?.mediumEmphasis : customColor?.hover;
    return {
      padding: spacing(0.4 - 0.04, 0.8),
      margin: spacing(0.8),
      border: '1px solid',
      borderColor: color,
      color,
      borderRadius: borderRadius
    };
  }
}));
const EventItem = ({validatedCurrentEvents,currentEventsArr,customColor},) => {
  const classes = useStyles({ customColor });

  return (
    <Grid>
      <Grid container>
        {validatedCurrentEvents.map(({ id }) => {
          const findedEl = find(currentEventsArr, ['id', id]);
          return (
            <Grid className={classes.containerOfDateItem}>
              <Grid container>
                <Typography variant={'body2'}>{format(findedEl?.value, findedEl?.format)}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

EventItem.propTypes = {
  currentEventsArr: PropTypes.array,
  customColor: PropTypes.any,
  validatedCurrentEvents: PropTypes.array
}

export default EventItem;
