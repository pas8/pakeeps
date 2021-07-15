import { useTakeFuncOfChangngDrawerOpenStatus } from './useTakeFuncOfChangngDrawerOpenStatus.hook';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, settingUrls, SETTINGS, ACCOUNT, THEME, SECURITY, APPEARANCE } from 'layouts/RouterLayout/denotation';
import { UseTakeFoldersArrType } from 'models/types';
import { ALL, CLOSE_MENU_ID, HEADER_PROPFILE_UTILS_FOLDER, menuOpenStatusDenotation } from 'models/denotation';
import { toChangeMenuOpenStatus } from 'store/modules/App/actions';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { getGlobalEventsArr, getIsZenModeActive, getLabels } from 'store/modules/App/selectors';
import { usePakeepFolders } from './usePakeepFolders.hook';
import { useFindCorrectFoldersPropertyies } from './useFindCorrectFoldersPropertyies.hook';
import { useAddAdditionalArr } from './useAddAdditionalArr.hook';
import { useAddIdToFolder } from './useAddIdToFolder.hook';
import { useFindFolderOrderNames } from './useFindFolderOrderNames.hook';
import { useConvertHeaderProfileUtilsObjToFolderArr } from './useConvertHeaderProfileUtilsObjToFolderArr.hook';
import MenuButton from 'components/Header/components/ProfileUtils/components/MenuButton';
import { useTakeHeaderProfileUtilsObj } from './useTakeHeaderProfileUtilsObj.hook';

export const useTakeFoldersPropertyies: UseTakeFoldersArrType = ({
  isFoldersHaveDraweView,
  handleCloseFoldersWithDrawerView,
  ...additiontalParamsOfUseFindFolderOrderNames
}) => {
  const dispatch = useDispatch();
  const labels = useSelector(getLabels);
  const events = useSelector(getGlobalEventsArr);

  const handleHideFolder = () => {
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus: menuOpenStatusDenotation.HIDDEN }));
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

  const closeMenuFolderArr = [
    {
      title: 'Close menu',
      iconName: 'close',
      id: 'folder-close',
      property: { value: AdditionalFolderPropertyNames.ON_CLICK, onClick: handleCloseFoldersWithDrawerView },
      color: 'default'
    }
  ];

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

  const defaultFoldersBefore = useAddIdToFolder({
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

  const closeMenuFolders = useAddIdToFolder({
    [CLOSE_MENU_ID]: {
      label: '',
      arr: closeMenuFolderArr
    }
  });

  const defaultPakeepFolders = usePakeepFolders({ events, labels });
  const isZenModeActive = useSelector(getIsZenModeActive);

  const { correctFolderValueOrder, correctFolders } = useFindCorrectFoldersPropertyies({
    defaultFoldersBefore: isZenModeActive
      ? { ...headerPropfileUtilsFolder, ...defaultFoldersBefore }
      : defaultFoldersBefore,
    defaultForderAfter,
    defaultSettingsFolders,
    defaultPakeepFolders
  });

  const notValidatedAllFolders = isFoldersHaveDraweView ? { ...closeMenuFolders, ...correctFolders } : correctFolders;

  // const folderOrderValueNamesWidthZenModeValidation = isZenModeActive
  //   ? [HEADER_PROPFILE_UTILS_FOLDER, ...correctFolderValueOrder]
  //   : correctFolderValueOrder;

  const notValidatedFolderOrderValueNames = isFoldersHaveDraweView
    ? [CLOSE_MENU_ID, ...correctFolderValueOrder]
    : correctFolderValueOrder;

  const { foldersBefore, ...defaultFolderPropertyies } = useFindFolderOrderNames(
    notValidatedAllFolders,
    notValidatedFolderOrderValueNames,
    additiontalParamsOfUseFindFolderOrderNames
  );

  return {
    ...defaultFolderPropertyies,
    foldersBefore: isFoldersHaveDraweView ? notValidatedAllFolders : foldersBefore
  };
};
