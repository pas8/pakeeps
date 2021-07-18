import { Dispatch, SetStateAction } from 'react';
import { LocalPasswordType } from 'store/modules/App/types';

export type AuthWithLocalPinCodePropsType = {
  isPinCodeVisibleChangerButtonHidden?: boolean;
  pinCode: string;
  isHaveTitle?: boolean;
  setPinCode: Dispatch<SetStateAction<string>>;
};
