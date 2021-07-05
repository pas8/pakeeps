import { isValid } from 'date-fns';
import { filter, includes, map } from 'lodash';
import { useState, useEffect } from 'react';

export const useValidatedCurrentEvents = (dateAndTimeInputsState, chosenItemArr) => {
  const [validatedCurrentEvents, setValidatedCurrentEvents] = useState([]);
  useEffect(() => {
    const currentEventsArr = map(dateAndTimeInputsState, el => el);
    const validatedCurrentEvents = filter(
      currentEventsArr,
      ({ value, id }) => !!isValid(value) && includes(chosenItemArr, id)
    );
    return setValidatedCurrentEvents(validatedCurrentEvents);
  }, [dateAndTimeInputsState, chosenItemArr]);

  return validatedCurrentEvents;
};
