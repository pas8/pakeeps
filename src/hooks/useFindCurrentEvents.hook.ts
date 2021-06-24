import { format as toFormat } from 'date-fns';
import { find } from 'lodash';
import { UseFindCurrentEventsType } from 'models/types';

export const useFindCurrentEvents: UseFindCurrentEventsType = (globalEvents, events, timeFormat, timeAndDateFromat) => {
  if (!globalEvents || !events) return null;

  const eventsArr = globalEvents.map(({ id: globalId, ...globalEventsProps }) => {
    const findedEvent = find(events, ({ id }) => id === globalId);
    const isEventWasChosen = !!findedEvent;

    const format = globalEventsProps?.onlyTime ? timeFormat : timeAndDateFromat;
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

  return eventsArr;
};
