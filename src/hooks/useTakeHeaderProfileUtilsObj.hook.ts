import { useIsColorLight } from './useIsColorLight.hook';
import { ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType } from './../models/types';
import { colord } from 'colord';
import { customColorPlaceholder } from 'components/AccountAvatar';
import AvatarButton from 'components/Header/components/ProfileUtils/components/AvatarButton';
import NoticationButton from 'components/Header/components/ProfileUtils/components/NoticationButton';
import ThemeChangerButton from 'components/Header/components/ProfileUtils/components/ThemeChangerButton';
import UploadButton from 'components/Header/components/ProfileUtils/components/UploadButton';
import ZenModeButton from 'components/Header/components/ProfileUtils/components/ZenModeButton';
import LockButton from 'components/Header/components/ViewLikeInTelegram/components/LockButton';
import { headerProfileUtilsDenotationIds, NONE } from 'models/denotation';
import { MenusLayoutName } from 'models/unums';
import { useSnackbar } from 'notistack';
import { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { operateToUploadData } from 'store/modules/App/operations';
import { getIsZenModeActive, getUserData } from 'store/modules/App/selectors';
import { toChangeThemeColors } from 'store/modules/Color/actions';
import { getColorTheme } from 'store/modules/Color/selectors';
import { toChangeSettingProperty } from 'store/modules/Settings/actions';

export const useTakeHeaderProfileUtilsObj = (): ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const toChangeTemporaryData
  const handleOpenAvatarMenu: MouseEventHandler<HTMLDivElement> = ({
    currentTarget,
    clientX: mouseX,
    clientY: mouseY
  }) => {
    const defaultMenuProps = {
      mouseX,
      mouseY,
      id: 'AvatarButton',
      customColor: customColorPlaceholder,
      menuName: MenusLayoutName.ACCOUNT
    };

    dispatch(toChangeTemporaryData({ newTemporaryData: { defaultMenuProps } }));
  };

  const themeColors = useSelector(getColorTheme);

  const handleInvertTheme = () => {
    const textColor = colord(themeColors.textColor).invert().toHex();
    const defaultBackgroundMain = colord(themeColors.defaultBackgroundMain).invert().toHex();
    const paperMain = colord(themeColors.paperMain).invert().toHex();
    const isDark = !useIsColorLight(paperMain);
    dispatch(toChangeThemeColors({ newThemeColors: { textColor, defaultBackgroundMain, paperMain } }));
    
    dispatch(toChangeSettingProperty({ property: { isHeaderHavePaperColor: isDark } }));
    // enqueueSnackbar({ message: 'White theme sucks, I am sr, just unluckky 😅', severity: 'info' });
    // enqueueSnackbar({
    //   message: 'U can theme theme in the setting, but remember that, white theme sucks 😅',
    //   severity: 'info'
    // });
  };

  const handleUplodaData = () => {
    dispatch(operateToUploadData());
  };

  const handleOpenNotificationMenu: MouseEventHandler<HTMLButtonElement> = ({ clientX: mouseX, clientY: mouseY }) => {
    console.log('');
    dispatch(
      toChangeTemporaryData({
        newTemporaryData: {
          defaultMenuProps: {
            mouseX,
            mouseY,
            customColor: customColorPlaceholder,
            id: 'handleOpenNotificationMenu',
            menuName: MenusLayoutName.NOTIFICATION
          }
        }
      })
    );
  };
  const { localPinCode } = useSelector(getUserData);

  const handleLockApp = () => {
    if (localPinCode === NONE) {
      return enqueueSnackbar({
        message: 'You havent added a pin code, but u can do this in setting/account',
        severity: 'info'
      });
    }

    dispatch(toChangeTemporaryData({ newTemporaryData: { isAuthedWithLocalPinCode: false } }));
  };

  const isZenModeActive = useSelector(getIsZenModeActive);

  const handleChageZenModeStatus = () => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { isZenModeActive: !isZenModeActive } }));
  };

  const headerProfileUtilsObj = {
    [headerProfileUtilsDenotationIds.UPLOAD_BUTTON]: {
      component: UploadButton,
      onClick: handleUplodaData,
      toolTipText: 'Upload all data'
    },
    [headerProfileUtilsDenotationIds.THEME_CHANGER_BUTTON]: {
      onClick: handleInvertTheme,
      component: ThemeChangerButton,
      toolTipText: 'Change theme'
    },
    [headerProfileUtilsDenotationIds.NOTICATION_BUTTON]: {
      component: NoticationButton,
      onClick: handleOpenNotificationMenu,
      toolTipText: 'Motifications'
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

  return headerProfileUtilsObj;
};
