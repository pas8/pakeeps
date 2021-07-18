import { Dispatch, SetStateAction } from 'react';
import { NamesArrOFOrderOfHeaderUtilsType } from 'store/modules/App/types';

export type TransferListOfHeaderUtilsPropsType = {};

export type ButtonUtilsPropsType = {
  selected: NamesArrOFOrderOfHeaderUtilsType;
  setSelected: Dispatch<SetStateAction<NamesArrOFOrderOfHeaderUtilsType>>;
  state:NamesArrOFOrderOfHeaderUtilsType[]
  exclusionNamesArr:NamesArrOFOrderOfHeaderUtilsType[]
  setState: Dispatch<SetStateAction<NamesArrOFOrderOfHeaderUtilsType[]>>;
};
