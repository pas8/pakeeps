import { Grid, Box } from '@material-ui/core';
import { format as toFormat, isValid } from 'date-fns';
import { find } from 'lodash';
import { FC } from 'react';
import { MenusLayoutName } from 'models/unums';
import compare_func from 'compare-func';

import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { CurrentEventsElementType } from 'models/types';
import EventItem from './components/EventItem';
import { PreviewEventListPropsType } from './types';
import { OnClickOfEventItemType } from './components/EventItem/types';

const PreviewEventList: FC<PreviewEventListPropsType> = ({
  validatedCurrentEvents,
  currentEventsArr,
  customColor,
  ...defaultEventItemProps
}) => (
  <Box my={0.4}>
    <Grid container>
      {validatedCurrentEvents.sort(compare_func('value')).map(({ id, value }, idx) => {
        const findedEl: CurrentEventsElementType = find(currentEventsArr, ['id', id])!;
        if (!findedEl) return null;

        const [icon] = useTakeIcon(findedEl?.iconName);
        const format = findedEl?.format;
        const validatedValue =
          isValid(value) && !!format ? toFormat(value, format, { useAdditionalDayOfYearTokens: true }) : 'Invalid date';
        const title = findedEl?.title;

        const onClick: OnClickOfEventItemType = e => {
          defaultEventItemProps.onClick({
            customColor,
            id,
            name: MenusLayoutName.EVENTS,
            mouseX: e.clientX,
            mouseY: e.clientY
          });
        };
        const key = `${title}-${idx}`;
        const isOnlyTime = findedEl?.onlyTime;

        const eventItemProps = {
          ...defaultEventItemProps,
          customColor,
          icon,
          key,
          color: findedEl.color,
          variant: findedEl.variant,
          title,
          value: validatedValue,
          isOnlyTime,
          onClick
        };
        return <EventItem {...eventItemProps} />;
      })}
    </Grid>
  </Box>
);

export default PreviewEventList;
