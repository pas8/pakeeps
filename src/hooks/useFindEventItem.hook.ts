import { find } from 'lodash';
import { useSelector } from 'react-redux';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import { EventIdType, IGlobalEvent } from 'store/modules/App/types';

export const useFindEventItem = (eventId: EventIdType): IGlobalEvent => {
  const events = useSelector(getGlobalEventsArr);

  const findedEvent = find(events, ({ id }) => eventId === id)!;
  return findedEvent;
};
