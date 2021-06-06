import { useEffect, useState } from 'react';
import { useFindCurrentEvents } from './useFindCurrentEvents.hook';

export const useCurrentEvents = (globalEvents, events, timeFormat, timeAndDateFromat) => {
  const [currentEventsArr, setCurrentEventsArr] = useState([]);

  useEffect(() => {
    const eventsArr = useFindCurrentEvents(globalEvents, events, timeFormat, timeAndDateFromat);
    return setCurrentEventsArr(eventsArr);
  }, [globalEvents, events, timeFormat, timeAndDateFromat]);

  return currentEventsArr;
};
