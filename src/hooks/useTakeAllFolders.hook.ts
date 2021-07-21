import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, settingUrls, SETTINGS, ACCOUNT, THEME, SECURITY, APPEARANCE } from 'layouts/RouterLayout/denotation';
import { ParamsOfUseFindCorrectFoldersPropertyiesType } from 'models/types';
import { ALL, HEADER_PROPFILE_UTILS_FOLDER, menuOpenStatusDenotation } from 'models/denotation';
import { toChangeMenuOpenStatus, toSetDrawerWidth } from 'store/modules/App/actions';
import MenuButton from 'components/Header/components/ProfileUtils/components/MenuButton';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { getIsZenModeActive } from 'store/modules/App/selectors';
import { usePakeepFolders } from './usePakeepFolders.hook';
import { useAddAdditionalArr } from './useAddAdditionalArr.hook';
import { useAddIdToFolder } from './useAddIdToFolder.hook';
import { useConvertHeaderProfileUtilsObjToFolderArr } from './useConvertHeaderProfileUtilsObjToFolderArr.hook';
import { useTakeFuncOfChangngDrawerOpenStatus } from './useTakeFuncOfChangngDrawerOpenStatus.hook';
import { useTakeHeaderProfileUtilsObj } from './useTakeHeaderProfileUtilsObj.hook';

export const useTakeAllFolders = (): ParamsOfUseFindCorrectFoldersPropertyiesType => {
  const dispatch = useDispatch();

  const handleHideFolder = () => {
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus: menuOpenStatusDenotation.HIDDEN }));
    dispatch(toSetDrawerWidth({ drawerWidth: 0 }));
  };
  const headerProfileUtilsObj = useTakeHeaderProfileUtilsObj();
  const headerPropfileUtilsArr = useConvertHeaderProfileUtilsObjToFolderArr(headerProfileUtilsObj);
  const handleChangeDrawerOpenStatus = useTakeFuncOfChangngDrawerOpenStatus();

  const zenModeArr = [
    {
      title: 'Menu ',
      iconName: '',
      id: 'Menu',
      property: {
        value: AdditionalFolderPropertyNames.CUSTOM_COMPONENT,
        customComponent: MenuButton,
        onClick: handleChangeDrawerOpenStatus
      },
      color: 'default'
    },
    ...headerPropfileUtilsArr
  ];

  const headerPropfileUtilsFolder = useAddIdToFolder({
    [HEADER_PROPFILE_UTILS_FOLDER]: { label: 'Header_Utils', arr: zenModeArr }
  });

  const navigationFolderArr = [
    {
      title: 'All pakeeps',
      iconName: 'infinity',
      id: ALL,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: BASE_URL }
    },
    {
      title: 'Open settings',
      iconName: 'settings',
      id: SETTINGS,
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls.BASE },
      color: 'default'
    }
  ];

  const utilsFolderArr = [
    {
      title: 'Hide folders',
      iconName: 'visibility',
      property: { value: AdditionalFolderPropertyNames.ON_CLICK, onClick: handleHideFolder },
      id: 'hide_folders',
      color: 'default'
    }
  ];

  const settingsNavFolderArr = useAddAdditionalArr([
    {
      title: 'Account',
      iconName: 'account',
      id: ACCOUNT,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls[ACCOUNT].BASE }
    },

    {
      title: 'Theme',
      iconName: 'color',
      id: THEME,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls[THEME].BASE }
    },

    {
      title: 'Security',
      iconName: 'security',
      id: SECURITY,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls[SECURITY].BASE }
    },
    {
      title: 'Appearance',
      iconName: 'view',
      id: APPEARANCE,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls[APPEARANCE].BASE }
    }
  ]);

  const navFolder = useAddIdToFolder({
    NAV: {
      label: 'Nav',
      arr: navigationFolderArr
    }
  });

  const defaultForderAfter = useAddIdToFolder({
    UTILS: {
      label: 'Utils',
      arr: utilsFolderArr
    }
  });

  const defaultSettingsFolders = useAddIdToFolder({
    ACCOUNT_SETTINGS: {
      label: 'Account_Settings',
      arr: settingsNavFolderArr
    }
  });

  const defaultPakeepFolders = usePakeepFolders();
  const isZenModeActive = useSelector(getIsZenModeActive);

  const defaultFoldersBefore = isZenModeActive ? { ...headerPropfileUtilsFolder, ...navFolder } : navFolder;

  return { defaultFoldersBefore, defaultSettingsFolders, defaultPakeepFolders, defaultForderAfter };
};
