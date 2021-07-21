import { FC, memo } from 'react';
import PreviewEventList from './components/PreviewEventList';
import compareFunc from 'compare-func';
import { useFindCurrentEvents } from 'hooks/useFindCurrentEvents.hook';
import { useDispatch, useSelector } from 'react-redux';

import { getGlobalEventsArr } from 'store/modules/App/selectors';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';
import { GlobalEventsType } from 'store/modules/App/types';
import { EventsPartPropsType } from './types';
import { toChangeDefaultLayoutMenuProps, toChangeTemporaryData } from 'store/modules/App/actions';
import { OnClickOfPreviewEventListType } from './components/PreviewEventList/types';

const EventsPart: FC<EventsPartPropsType> = ({ events = [], customColor, parentBackgroundColor }) => {
  const dispatch = useDispatch();

 
  const globalEvents: GlobalEventsType = useSelector(getGlobalEventsArr);

  const sortedEvents = events.sort(compareFunc('value'));
  const currentEventsArr = useFindCurrentEvents(globalEvents, sortedEvents );

  if (!currentEventsArr) return null;

  const onClick: OnClickOfPreviewEventListType = props => {
    dispatch(toChangeDefaultLayoutMenuProps({ props }));
  };

  const allPreviewEventListProps = {
    customColor,
    onClick,
    parentBackgroundColor,
    validatedCurrentEvents: events,
    currentEventsArr
  };

  return <PreviewEventList {...allPreviewEventListProps} />;
};

export default memo(EventsPart);
