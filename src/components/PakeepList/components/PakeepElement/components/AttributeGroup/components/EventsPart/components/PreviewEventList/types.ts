import { CurrentEventsArrType, CustomColorType } from 'models/types';
import { GlobalEventsType } from 'store/modules/App/types';

export type PreviewEventListPropsType = {
  validatedCurrentEvents: GlobalEventsType;
  currentEventsArr: CurrentEventsArrType;
  customColor: CustomColorType;
};
