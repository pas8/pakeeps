import { format as toFormat, isValid } from 'date-fns';
import { find } from 'lodash';
import { UseFindCurrentEventsType } from 'models/types';
import { useSelector } from 'react-redux';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';

export const useFindCurrentEvents: UseFindCurrentEventsType = (globalEvents, events) => {
  const timeFormat = useSelector(getTimeFormat);
  const timeAndDateFromat = useSelector(getTimeAndDateFromat);

  if (!globalEvents.length || !events || !timeFormat || !timeAndDateFromat) return null;
  const eventsArr = globalEvents.map(({ id: globalId, ...globalEventsProps }) => {
    const findedEvent = find(events, ({ id }) => id === globalId);
    const isEventWasChosen = !!findedEvent;

    const format = globalEventsProps?.onlyTime ? timeFormat : timeAndDateFromat;
    if (!isValid(findedEvent?.value || globalEventsProps?.value)) return;
    const inputValue = toFormat(findedEvent?.value || globalEventsProps?.value, format);

    const validatedFindedEvent = isEventWasChosen ? { ...findedEvent, isChosen: true } : { isChosen: false };
    const extendedCurrentEvent = {
      ...globalEventsProps,
      ...validatedFindedEvent,
      id: globalId,
      inputValue,
      format
    };

    return extendedCurrentEvent;
  });

  //@ts-ignore
  const f: CurrentEventsElementType = eventsArr.filter(el => !!el);
  return f;
};
