import { format as toFormat } from 'date-fns';
import { find } from 'lodash';

export const useFindCurrentEvents = (globalEvents, events, timeFormat, timeAndDateFromat) => {

  const eventsArr = globalEvents.map(({ id: globalId, ...globalEventsProps }) => {
    const findedEvent = find(events, ({ id }) => id === globalId);
    const isEventWasChosen = !!findedEvent;
    const format = globalEventsProps?.onlyTime ? timeFormat : timeAndDateFromat;
    const inputValue = toFormat(findedEvent?.value || globalEventsProps?.value, format);

    const validatedFindedEvent = isEventWasChosen ? { ...findedEvent, isChosen: true } : { isChosen: false };
    const extendedCurrentEvent = { ...globalEventsProps, ...validatedFindedEvent, id: globalId, inputValue, format,value:validatedFindedEvent?.value };

    return extendedCurrentEvent;
  });

  return eventsArr

}