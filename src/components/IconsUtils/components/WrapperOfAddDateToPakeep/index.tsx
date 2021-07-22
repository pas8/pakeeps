
import { FC } from 'react';
import {  useSelector } from 'react-redux';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';
import { EventsListProps } from 'components/IconsUtils/types';
import { useFindCurrentEvents } from 'hooks/useFindCurrentEvents.hook';
import AddDateToPakeep from '../AddDateToPakeep';
import { WrapperOfAddDateToPakeepPropsType } from '../AddDateToPakeep/types';

const WrapperOfAddDateToPakeep: FC<WrapperOfAddDateToPakeepPropsType & EventsListProps> = ({ events, handleSaveEvents, ...props }) => {
  const globalEvents = useSelector(getGlobalEventsArr);
  const currentEventsArr = useFindCurrentEvents(globalEvents, globalEvents, );
  const addDateToPakeepProps = {
    handleSaveEvents,
    currentEventsArr,
    ...props
  };

  return <AddDateToPakeep {...addDateToPakeepProps} />;
};

export default WrapperOfAddDateToPakeep;