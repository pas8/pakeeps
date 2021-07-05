import { CustomColorType } from 'models/types';
import { IGlobalEvent, GlobalEventsType, EventsOfPakeepType } from 'store/modules/App/types';
import { TimeAndDateFromatType, TimeFormatType } from 'store/modules/Settings/types';

export type DefaultEventsPartPropsType = {
  events: EventsOfPakeepType;
};

export type EventsPartPropsType = {
  customColor: CustomColorType;
} & DefaultEventsPartPropsType;
