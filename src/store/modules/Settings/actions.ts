import { TypeNames } from './enums';
import { PayloadTypes, SettingsActionTypes } from './types';

export const toChangeLoginStatus = (payload: PayloadTypes[TypeNames.HANDLE_SETTING_PROPERTY]): SettingsActionTypes => ({
  type: TypeNames.HANDLE_SETTING_PROPERTY,
  payload
});
