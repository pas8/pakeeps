import { EventsListProps } from 'components/IconsUtils/types';
import PakeepPropertyProvider from 'components/PakeepPropertyProviders';
import { useCurrentEvents } from 'hooks/useCurrentEvents.hook';
import { useFindCurrentEvents } from 'hooks/useFindCurrentEvents.hook';
import { HandlePakeepEventsType } from 'models/types';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  toChangePakeepProperty } from 'store/modules/App/actions';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';
import AddDateToPakeep from '../AddDateToPakeep';
import { WrapperOfAddDateToPakeepPropsType } from '../AddDateToPakeep/types';

const WrapperOfAddDateToPakeep: FC<WrapperOfAddDateToPakeepPropsType & EventsListProps> = ({ events, handleSaveEvents, ...props }) => {
  const globalEvents = useSelector(getGlobalEventsArr);
  const timeFormat = useSelector(getTimeFormat);
  const timeAndDateFromat = useSelector(getTimeAndDateFromat);

  const currentEventsArr = useFindCurrentEvents(globalEvents, events, timeFormat, timeAndDateFromat);

  const addDateToPakeepProps = {
    handleSaveEvents,
    currentEventsArr,
    ...props
  };

  return <AddDateToPakeep {...addDateToPakeepProps} />;
};

export default WrapperOfAddDateToPakeep;
