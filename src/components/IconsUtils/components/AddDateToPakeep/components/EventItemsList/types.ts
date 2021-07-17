import { CustomColorType } from 'models/types';
import { Dispatch, SetStateAction } from 'react';
import { PakeepIdType } from 'store/modules/App/types';
import { ChosenItemArrType, DateListArrType, HandleDateAndTimeInputsStateType } from '../../types';

export type EventItemsListPropsType = {
  eventListArr: DateListArrType;
  setChosenItemArr: Dispatch<SetStateAction<ChosenItemArrType>>;
  dateAndTimeInputsState: any;
  pakeepId: PakeepIdType;
  handleDateAndTimeInputsState: HandleDateAndTimeInputsStateType;
  focusedEventId: string;
  currentEventsObject: any;
  chosenItemArr: ChosenItemArrType;
  customColor: CustomColorType;
};
