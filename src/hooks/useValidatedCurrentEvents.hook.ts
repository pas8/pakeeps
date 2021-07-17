import { DateType } from '@date-io/type';
import { ChosenItemArrType, DateAndTimeInputsStateType } from 'components/IconsUtils/components/AddDateToPakeep/types';
import { isValid } from 'date-fns';
import { filter, includes, map } from 'lodash';
import { useState, useEffect } from 'react';
import { EventsOfPakeepType } from 'store/modules/App/types';

export const useValidatedCurrentEvents = (
  dateAndTimeInputsState: DateAndTimeInputsStateType,
  chosenItemArr: ChosenItemArrType
): EventsOfPakeepType => {
  const [validatedCurrentEvents, setValidatedCurrentEvents] = useState<EventsOfPakeepType>([]);
  useEffect(() => {
    const currentEventsArr = map(dateAndTimeInputsState, ({ id, value }) => ({ id, value }));
    const newValidatedCurrentEvents = filter(
      currentEventsArr,
      ({ value, id }) => !!isValid(value) && includes(chosenItemArr, id)
    );
    return setValidatedCurrentEvents(newValidatedCurrentEvents);
  }, [dateAndTimeInputsState, chosenItemArr]);

  return validatedCurrentEvents;
};
