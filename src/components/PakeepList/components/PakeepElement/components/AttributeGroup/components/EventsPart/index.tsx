import { FC } from 'react';
import PreviewEventList from './components/PreviewEventList';
import compareFunc from 'compare-func';
import { useFindCurrentEvents } from 'hooks/useFindCurrentEvents.hook';
import { useSelector } from 'react-redux';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';
import { GlobalEventsType } from 'store/modules/App/types';
import { EventsPartPropsType } from './types';

const EventsPart: FC<EventsPartPropsType> = ({ events = [], customColor }) => {
  const timeFormat = useSelector(getTimeFormat);
  const timeAndDateFromat = useSelector(getTimeAndDateFromat);
  const globalEvents: GlobalEventsType = useSelector(getGlobalEventsArr);

  const sortedEvents = events.sort(compareFunc('value'));
  const currentEventsArr = useFindCurrentEvents(globalEvents, sortedEvents, timeFormat, timeAndDateFromat);

  if (!currentEventsArr) return null;
  
  const allPreviewEventListProps = {
    customColor,
    validatedCurrentEvents: events,
    currentEventsArr
  };

  return <PreviewEventList {...allPreviewEventListProps} />;
};

export default EventsPart;
