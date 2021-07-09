import { EventsOfPakeepType } from 'store/modules/App/types';
import { intersection, intersectionBy } from 'lodash';
import { UseFindSelectedEventsType } from 'models/types';
import { useEffect, useState } from 'react';

export const useFindSelectedEvents: UseFindSelectedEventsType = selectedPakeeps => {
  const [selectedEvents, setSelectedEvents] = useState<EventsOfPakeepType>([]);

  const allEvents = selectedPakeeps.map(({ events }) => events);

  useEffect(() => {
    console.log(allEvents)
    setSelectedEvents(intersectionBy(...allEvents,'id'));
  }, [selectedPakeeps]);

  return selectedEvents;
};
