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
    // maxWidth: spacing(38),
    margin: spacing(0.4, 0)
  }
}));

const PreviewEventList: FC<PreviewEventListPropsType> = ({ validatedCurrentEvents, currentEventsArr, customColor }) => {
  const classes = useStyles();
  const isFirstVariantOfEventItemView = true;
  const isInlineVariantOfEventItemView = true;

  const isInputTextViewOfCaptionOfEventItem = !true;

  return (
    <Grid>
      <Grid container className={classes.container}>
        {validatedCurrentEvents.map(({ id }, idx) => {
          const findedEl: CurrentEventsElementType = find(currentEventsArr, ['id', id])!;

          const [icon] = useTakeIcon(findedEl?.iconName);

          const format = findedEl?.format;
          const value = isValid(findedEl?.value)
            ? toFormat(findedEl.value, format, { useAdditionalDayOfYearTokens: true })
            : 'Invalid date';
          const title = findedEl?.title;

          const key = `${title}-${idx}`;
          const isOnlyTime = findedEl?.onlyTime;

          const eventItemProps = {
            icon,
            key,
            title,
            customColor,
            value,
            isOnlyTime,
            isInputTextViewOfCaptionOfEventItem,
            isFirstVariantOfEventItemView,
            isInlineVariantOfEventItemView
          };
          return <EventItem {...eventItemProps} />;
        })}
      </Grid>
    </Grid>
  );
};

export default PreviewEventList;
