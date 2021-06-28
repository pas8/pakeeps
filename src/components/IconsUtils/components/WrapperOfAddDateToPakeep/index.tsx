import PakeepPropertyProvider from 'components/PakeepPropertyProviders';
import { useCurrentEvents } from 'hooks/useCurrentEvents.hook';
import { useFindCurrentEvents } from 'hooks/useFindCurrentEvents.hook';
import { HandlePakeepEventsType } from 'models/types';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangePakeepCustomProperty, toChangePakeepProperty } from 'store/modules/App/actions';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';
import AddDateToPakeep from '../AddDateToPakeep';
import { WrapperOfAddDateToPakeepPropsType } from '../AddDateToPakeep/types';

const WrapperOfAddDateToPakeep: FC<WrapperOfAddDateToPakeepPropsType> = props => {
  const globalEvents = useSelector(getGlobalEventsArr);
  const timeFormat = useSelector(getTimeFormat);
  const timeAndDateFromat = useSelector(getTimeAndDateFromat);
  const dispatch = useDispatch();

  const handlePakeepEvents: HandlePakeepEventsType = (pakeepId, events) => {
    dispatch(toChangePakeepCustomProperty({ pakeepId, property: { events } }));
  };

  return (
    <PakeepPropertyProvider.Consumer>
      {({ events }) => {
        const currentEventsArr = useFindCurrentEvents(globalEvents, events, timeFormat, timeAndDateFromat);

        const addDateToPakeepProps = {
          handlePakeepEvents,
          currentEventsArr,
          ...props
        };
        return <AddDateToPakeep {...addDateToPakeepProps} />;
      }}
    </PakeepPropertyProvider.Consumer>
  );
};

export default WrapperOfAddDateToPakeep;
