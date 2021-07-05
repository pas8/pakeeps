import { CurrentEventsArrType, CustomColorType } from 'models/types';
import { ReactNode } from 'react';
import { EventIdType, IconNameType, PakeepIdType } from 'store/modules/App/types';

export type WrapperOfAddDateToPakeepPropsType = {
  onMenuClose: () => void;
  id: PakeepIdType;
  customColor: CustomColorType;
};

export type AddDateToPakeepPropsType = {
  currentEventsArr: CurrentEventsArrType | null;
  handlePakeepEvents: any;
} & WrapperOfAddDateToPakeepPropsType;

export type DateAndTimeInputElementStateType = {
  id: string;
  value: number | Date;
  inputValue: string;
};

export type DateAndTimeInputsStateType = {
  [key: string]: DateAndTimeInputElementStateType;
};

export type HandleDateAndTimeInputsStateType = (id: EventIdType, value: any, inputValue: string) => void;

export type ChosenItemArrType = EventIdType[];

export type DateListElementType = {
  title: string;
  iconName: IconNameType;
  onClick?: Function;
  onlyTime?: boolean;
  dynamicComponent?: {
    component?: ReactNode;
    props?: object;
  };
  id: EventIdType;
};

export type DateListArrType = DateListElementType[];
