import { CustomColorType } from 'models/types';
import { IGlobalEvent, GlobalEventsType, EventsOfPakeepType, ColorType } from 'store/modules/App/types';
import { TimeAndDateFromatType, TimeFormatType } from 'store/modules/Settings/types';

export type DefaultEventsPartPropsType = {
  events: EventsOfPakeepType;
};

export type EventsPartPropsType = {
  customColor: CustomColorType;
  parentBackgroundColor:ColorType
} & DefaultEventsPartPropsType;
