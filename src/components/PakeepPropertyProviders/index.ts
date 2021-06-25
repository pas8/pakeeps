import { createContext } from 'react';
import { EventsOfPakeepType, LabelsOfPakeepType } from 'store/modules/App/types';

const PakeepPropertyProvider = createContext<{ events: EventsOfPakeepType | []; labels: LabelsOfPakeepType | [] }>({
  events: [],
  labels: []
});

export default PakeepPropertyProvider;
