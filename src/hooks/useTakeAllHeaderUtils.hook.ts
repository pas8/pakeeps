import { colord } from 'colord';
import firebase from 'firebase/app';
import { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';
import 'firebase/auth';

import { customColorPlaceholder } from 'components/AccountAvatar';
import AvatarButton from 'components/Header/components/ProfileUtils/components/AvatarButton';
import NoticationButton from 'components/Header/components/ProfileUtils/components/NoticationButton';
import ThemeChangerButton from 'components/Header/components/ProfileUtils/components/ThemeChangerButton';
import UploadButton from 'components/Header/components/ProfileUtils/components/UploadButton';
import ZenModeButton from 'components/Header/components/ProfileUtils/components/ZenModeButton';
import LockButton from 'components/Header/components/ViewLikeInTelegram/components/LockButton';
import { headerProfileUtilsDenotationIds, LOCAL_STORAGE_KEY, NONE } from 'models/denotation';
import { SETTINGS_ACCOUNT_BASE_URL, SETTINGS_SECURITY_BASE_URL } from 'layouts/RouterLayout/denotation';
import { toChangeLoginStatus } from 'store/modules/Auth/actions';
import { MenusLayoutName } from 'models/unums';
import { toChangeDefaultLayoutMenuProps, toChangeTemporaryData } from 'store/modules/App/actions';
import { operateToSetNullityStore, operateToUploadData } from 'store/modules/App/operations';
import {
  getHeaderProperties,
  getIsCurrentNumberOfPakeepColumnsIsOne,
  getIsZenModeActive,
  getOrderOfOnlyOnePakeepColumn,
  getUserData
} from 'store/modules/App/selectors';
import { toChangeThemeColors } from 'store/modules/Color/actions';
import { getColorTheme } from 'store/modules/Color/selectors';
import { toChangeSettingProperty } from 'store/modules/Settings/actions';
import { ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType } from './../models/types';
import { useIsColorLight } from './useIsColorLight.hook';
import { useFindCorrectHeaderUtilsObj } from './useFindCorrectHeaderUtilsObj.hook';
import { useLocalStorage } from 'react-use';
import PakeepListViewChangerButton from 'components/Header/components/PakeepListViewChangerButton';

export const useTakeAllHeaderUtils = (): ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenAvatarMenu: MouseEventHandler<HTMLDivElement> = ({
    currentTarget,
    clientX: mouseX,
    clientY: mouseY
  }) => {
    const props = {
      mouseX,
      mouseY,
      id: 'AvatarButton',
      name: MenusLayoutName.ACCOUNT
    };

    dispatch(toChangeDefaultLayoutMenuProps({ props }));
  };

  const router = useRouter();
  const themeColors = useSelector(getColorTheme);
  const isCurrentNumberOfPakeepColumnsIsOne = useSelector(getIsCurrentNumberOfPakeepColumnsIsOne);

  const handleInvertTheme = () => {
    const textColor = colord(themeColors.textColor).invert().toHex();
    const defaultBackgroundMain = colord(themeColors.defaultBackgroundMain).invert().toHex();
    const paperMain = colord(themeColors.paperMain).invert().toHex();
    const isDark = !useIsColorLight(paperMain);
    dispatch(toChangeThemeColors({ newThemeColors: { textColor, defaultBackgroundMain, paperMain } }));

    dispatch(toChangeSettingProperty({ property: { isHeaderHavePaperColor: isDark } }));
    // enqueueSnackbar({ message: 'White theme sucks, I am sr, just unluckky ????', severity: 'info' });
    // enqueueSnackbar({
    //   message: 'U can theme theme in the setting, but remember that, white theme sucks ????',
    //   severity: 'info'
    // });
  };

  const handleUplodaData = () => {
    dispatch(operateToUploadData());
  };

  const handleOpenNotificationMenu: MouseEventHandler<HTMLButtonElement> = ({ clientX: mouseX, clientY: mouseY }) => {
    dispatch(
      toChangeDefaultLayoutMenuProps({
        props: {
          mouseX,
          mouseY,
          id: 'handleOpenNotificationMenu',
          name: MenusLayoutName.NOTIFICATION
        }
      })
    );
  };
  const { localPinCode } = useSelector(getUserData);

  const handleLockApp = () => {
    if (localPinCode === NONE) {
      return enqueueSnackbar({
        message: 'You havent added a pin code, but u can do this in setting/account',
        severity: 'info',
        buttonText: 'To settings',
        onClick: () => router.push(SETTINGS_SECURITY_BASE_URL)
      });
    }

    dispatch(toChangeTemporaryData({ newTemporaryData: { isAuthedWithLocalPinCode: false } }));
  };

  const isZenModeActive = useSelector(getIsZenModeActive);

  const handleChageZenModeStatus = () => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { isZenModeActive: !isZenModeActive } }));
  };

  const [, , remove] = useLocalStorage(LOCAL_STORAGE_KEY);

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatch(toChangeLoginStatus({ isLogined: false }));
    dispatch(toChangeLoginStatus({ isLogined: false }));
    dispatch(operateToSetNullityStore());
    remove();
  };

  const handleChangePakeepsListView = () => {
    dispatch(
      toChangeTemporaryData({
        newTemporaryData: { isCurrentNumberOfPakeepColumnsIsOne: !isCurrentNumberOfPakeepColumnsIsOne }
      })
    );
  };

  const { userName, name, email } = useSelector(getUserData);
  const accountCaption = name !== NONE ? name : userName !== NONE ? userName : email !== NONE ? email : 'anonymys';
  const MAX_STRING_LENGTH = 10;

  const allHeaderButtonUtils = {
    [headerProfileUtilsDenotationIds.SIGN_IN_AS]: {
      toolTipText: `Sign in as ${
        accountCaption.length > MAX_STRING_LENGTH ? accountCaption.slice(0, MAX_STRING_LENGTH) + '....' : accountCaption
      }`,
      onClick: () => router.push(SETTINGS_ACCOUNT_BASE_URL),
      iconName: 'person',
      component: false
    },
    [headerProfileUtilsDenotationIds.SIGNOUT]: {
      toolTipText: 'Sign Out ',
      onClick: handleSignOut,
      iconName: 'signout',
      component: false
    },
    [headerProfileUtilsDenotationIds.UPLOAD_BUTTON]: {
      component: UploadButton,
      onClick: handleUplodaData,
      toolTipText: 'Upload all data'
    },
    [headerProfileUtilsDenotationIds.CHANGE_PAKEEPS_LIST_VIEW]: {
      component: PakeepListViewChangerButton,
      onClick: handleChangePakeepsListView,
      toolTipText: isCurrentNumberOfPakeepColumnsIsOne ? 'List view' : 'Grid view'
    },

    [headerProfileUtilsDenotationIds.THEME_CHANGER_BUTTON]: {
      onClick: handleInvertTheme,
      component: ThemeChangerButton,
      toolTipText: 'Change theme'
    },
    [headerProfileUtilsDenotationIds.NOTICATION_BUTTON]: {
      component: NoticationButton,
      onClick: handleOpenNotificationMenu,
      toolTipText: 'Notifications'
    },
    [headerProfileUtilsDenotationIds.LOCK_BUTTON]: {
      component: LockButton,
      onClick: handleLockApp,
      toolTipText: 'Lock your accont'
    },
    [headerProfileUtilsDenotationIds.ZEN_MODE_BUTTON]: {
      component: ZenModeButton,
      onClick: handleChageZenModeStatus,
      toolTipText: 'Switch to zen mode'
    },
    [headerProfileUtilsDenotationIds.AVATAR_BUTTON]: {
      component: AvatarButton,
      onClick: handleOpenAvatarMenu,
      toolTipText: 'Open your profile'
    }
  };

  return allHeaderButtonUtils;
};
