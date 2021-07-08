import { Grid, makeStyles } from '@material-ui/core';
import { format as toFormat, isValid } from 'date-fns';
import { find } from 'lodash';
import { FC } from 'react';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { CurrentEventsElementType } from 'models/types';
import EventItem from './components/EventItem';
import { PreviewEventListPropsType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    // maxWidth: spacing(36),
    margin: spacing(0.4, 0)
  }
}));

const PreviewEventList: FC<PreviewEventListPropsType> = ({
  validatedCurrentEvents,
  currentEventsArr,
  customColor,
  parentBackgroundColor
}) => {
  const classes = useStyles();

  return (
    <Grid>
      <Grid container className={classes.container}>
        {validatedCurrentEvents.map(({ id, value }, idx) => {
          const findedEl: CurrentEventsElementType = find(currentEventsArr, ['id', id])!;

          const [icon] = useTakeIcon(findedEl?.iconName);
          const format = findedEl?.format;
          const validatedValue = isValid(value)
            ? toFormat(value, format, { useAdditionalDayOfYearTokens: true })
            : 'Invalid date';
          const title = findedEl?.title;

          const key = `${title}-${idx}`;
          const isOnlyTime = findedEl?.onlyTime;

          const eventItemProps = {
            icon,
            key,
            color: findedEl.color,
            variant: findedEl.variant,
            title,
            parentBackgroundColor,
            customColor,
            value: validatedValue,
            isOnlyTime
          };
          return <EventItem {...eventItemProps} />;
        })}
      </Grid>
    </Grid>
  );
};

export default PreviewEventList;
