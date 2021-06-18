import { CustomColorType } from 'models/types';
import { GlobalEventsType, GlobalLabelsType, PakeepIdType } from 'store/modules/App/types';
import { TimeAndDateFromatType, TimeFormatType } from 'store/modules/Settings/types';

export type AttributeGroupPropsType = {
  customColor: CustomColorType;
  events: GlobalEventsType;
  globalEvents: GlobalEventsType;
  handleDeleteLabelFromPakeepFunc: Function;
  labels: GlobalLabelsType;
  pakeepId: PakeepIdType;
  parentBackgrounColor: string;
  timeAndDateFromat: TimeAndDateFromatType;
  timeFormat: TimeFormatType;
};
