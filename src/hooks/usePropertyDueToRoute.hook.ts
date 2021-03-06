import { useRouter } from 'next/dist/client/router';
import { AUTH_BASE_URL, denotationOfCorrectLayoutCases, SETTINGS_BASE_URL } from 'layouts/RouterLayout/denotation';
import { isEqual, startsWith } from 'lodash';
import { NEW_USER_URL, SIGN_IN_URL } from 'models/denotation';
import { useSelector } from 'react-redux';
import { getIsAuthedWithLocalPassword } from 'store/modules/App/selectors';

export const usePropertyDueToRoute = () => {
  const { route } = useRouter();
  const isAuthedWithLocalPinCode = useSelector(getIsAuthedWithLocalPassword);

  const property = isEqual(route, '/')
    ? denotationOfCorrectLayoutCases.BASE_URL
    : startsWith(route, AUTH_BASE_URL) || !isAuthedWithLocalPinCode
    ? denotationOfCorrectLayoutCases.FOLDER_LAYOUT_HIDDEN
    : startsWith(route, SETTINGS_BASE_URL)
    ? denotationOfCorrectLayoutCases.SETTING_URL
    : '';
  return property;
};
