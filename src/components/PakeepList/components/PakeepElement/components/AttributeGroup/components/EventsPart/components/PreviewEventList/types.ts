import { CurrentEventsArrType, CustomColorType } from 'models/types';
import { ColorType, DefaultMenuPropsType, EventsOfPakeepType } from 'store/modules/App/types';

export type OnClickOfPreviewEventListType = (defaultMenuProps: DefaultMenuPropsType) => void;

export type PreviewEventListPropsType = {
  validatedCurrentEvents: EventsOfPakeepType;
  currentEventsArr: CurrentEventsArrType;
  onClick: OnClickOfPreviewEventListType;
  customColor: CustomColorType;
  parentBackgroundColor: ColorType;
};
