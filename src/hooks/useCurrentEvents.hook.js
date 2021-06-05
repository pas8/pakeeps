import { useEffect, useState } from 'react';
import { addDays, isValid, format as toFormat } from 'date-fns';
import { filter, find, mapKeys, map, uniq, uniqWith, isEqual, mapValues } from 'lodash';

export const useCurrentEvents = (globalEvents, events, timeFormat, timeAndDateFromat) => {
  const [currentEventsArr, setCurrentEventsArr] = useState([]);

  useEffect(() => {
    const eventsArr = globalEvents.map(({ id: globalId, ...globalEventsProps }) => {
      const findedEvent = find(events, ({ id }) => id === globalId);
      const isEventWasChosen = !!findedEvent;
      const format = globalEventsProps?.onlyTime ? timeFormat : timeAndDateFromat;
      const inputValue = toFormat(findedEvent?.value || globalEventsProps?.value, format);

      const validatedFindedEvent = isEventWasChosen ? { ...findedEvent, isChosen: true } : { isChosen: false };
      const extendedCurrentEvent = { ...globalEventsProps, ...validatedFindedEvent, id: globalId, inputValue, format,value:validatedFindedEvent?.value };

      return extendedCurrentEvent;
    });
    return setCurrentEventsArr(eventsArr);
  }, [globalEvents, events, timeFormat, timeAndDateFromat]);

  return currentEventsArr;
};
