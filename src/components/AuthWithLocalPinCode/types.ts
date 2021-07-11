import { Dispatch, SetStateAction } from 'react';
import { LocalPasswordType } from 'store/modules/App/types';

export type AuthWithLocalPinCodePropsType = {
  isPinCodeVisibleChangerButtonHidden?: boolean;
  pinCode: string;
  setPinCode: Dispatch<SetStateAction<string>>;
};
