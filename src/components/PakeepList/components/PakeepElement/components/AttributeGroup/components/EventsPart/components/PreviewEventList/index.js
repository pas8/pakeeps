import { Grid, makeStyles } from '@material-ui/core';
import { format as toFormat, isValid } from 'date-fns';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import EventItem from './components/EventItem';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    maxWidth: spacing(38),
    margin: spacing(0.4, 0)
  }
}));

const PreviewEventList = ({ validatedCurrentEvents, currentEventsArr, customColor }) => {
  const classes = useStyles();
  const isFirstVariantOfEventItemView = true;

  return (
    <Grid>
      <Grid container className={classes.container}>
        {validatedCurrentEvents.map(({ id }) => {
          const findedEl = find(currentEventsArr, ['id', id]);

          const [icon] = useTakeIcon(findedEl?.iconName);

          const format = findedEl?.format;
          const value = isValid(findedEl?.value) ? toFormat(findedEl?.value, format) : 'Invalid date';
          const title = findedEl?.title;

          const isOnlyTime = findedEl?.onlyTime;
          const eventItemProps = { icon, title, customColor, value, isOnlyTime, isFirstVariantOfEventItemView };
          return <EventItem {...eventItemProps} />;
        })}
      </Grid>
    </Grid>
  );
};

PreviewEventList.propTypes = {
  currentEventsArr: PropTypes.array,
  customColor: PropTypes.any,
  validatedCurrentEvents: PropTypes.array
};

export default PreviewEventList;
