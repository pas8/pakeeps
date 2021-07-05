import { CurrentEventsArrType, CustomColorType } from 'models/types';
import { EventsOfPakeepType, GlobalEventsType } from 'store/modules/App/types';

export type PreviewEventListPropsType = {
  validatedCurrentEvents: EventsOfPakeepType;
  currentEventsArr: CurrentEventsArrType;
  customColor: CustomColorType;
};
