import { TypeNames } from './enums';
import { PayloadTypes, SettingsActionTypes } from './types';

export const toChangeSettingProperty = (payload: PayloadTypes[TypeNames.HANDLE_SETTING_PROPERTY]): SettingsActionTypes => ({
  type: TypeNames.HANDLE_SETTING_PROPERTY,
  payload
});
