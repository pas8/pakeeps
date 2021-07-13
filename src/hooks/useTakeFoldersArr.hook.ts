import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMeasure } from 'react-use';
import { BASE_URL, settingUrls, SETTINGS, ACCOUNT, THEME, SECURITY, APPEARANCE } from 'layouts/RouterLayout/denotation';
import { UseTakeFoldersArrType } from 'models/types';
import { ALL, menuOpenStatusDenotation, OPEN_MORE } from 'models/denotation';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { getGlobalEventsArr, getLabels } from 'store/modules/App/selectors';
import { usePakeepFolders } from './usePakeepFolders.hook';
import { toChangeMenuOpenStatus } from 'store/modules/App/actions';
import { useFindCorrectFoldersPropertyies } from './useFindCorrectFoldersPropertyies.hook';
import { useAddAdditionalArr } from './useAddAdditionalArr.hook';
import { useAddIdToFolder } from './useAddIdToFolder.hook';
import { useFindFolderOrderNames } from './useFindFolderOrderNames.hook';

export const useTakeFoldersArr: UseTakeFoldersArrType = ({
  isFoldersHaveDraweView,
  handleDrawerWidth,
  handleCloseFoldersWithDrawerView
}) => {
  const [ref, { width: drawerWidth, height: folderHeight }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    handleDrawerWidth(drawerWidth);
  }, [drawerWidth]);

  const dispatch = useDispatch();

  const labels = useSelector(getLabels);
  const events = useSelector(getGlobalEventsArr);

  const handleHideFolder = () => {
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus: menuOpenStatusDenotation.HIDDEN }));
    setTimeout(() => {
      handleDrawerWidth(0);
    }, 400);
  };

  // const

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
      iconName: '',
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
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, onClick: handleHideFolder },
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
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls.ACCOUNT.BASE }
    },

    {
      title: 'Theme',
      iconName: 'color',
      id: THEME,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls.THEME.BASE }
    },

    {
      title: 'Security',
      iconName: 'security',
      id: SECURITY,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls.SECURITY.BASE }
    },
    {
      title: 'Appearance',
      iconName: 'view',
      id: APPEARANCE,
      color: 'default',
      property: { value: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE, route: settingUrls.APPEARANCE.BASE }
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

  const CLOSE_MENU_ID = 'CLOSE_MENU';

  const closeMenuFolders = useAddIdToFolder({
    [CLOSE_MENU_ID]: {
      label: 'Close_Menu',
      arr: closeMenuFolderArr
    }
  });

  const openMoreFolder = useAddIdToFolder({
    [OPEN_MORE]: {
      label: '',
      arr: navigationFolderArr
    }
  });

  const defaultPakeepFolders = usePakeepFolders({ events, labels });

  const { correctFolderValueOrder, correctFolders } = useFindCorrectFoldersPropertyies({
    defaultFoldersBefore,
    defaultForderAfter,
    defaultSettingsFolders,
    defaultPakeepFolders
  });

  const notValidatedAllFolders = isFoldersHaveDraweView ? { ...closeMenuFolders, ...correctFolders } : correctFolders;

  const notValidatedFolderOrderValueNames = isFoldersHaveDraweView
    ? [CLOSE_MENU_ID, ...correctFolderValueOrder]
    : correctFolderValueOrder;

  const defaultFolderPropertyies = useFindFolderOrderNames(notValidatedAllFolders, notValidatedFolderOrderValueNames);
  const allFolders = { ...notValidatedAllFolders, ...openMoreFolder };

  return { ...defaultFolderPropertyies, ref, allFolders };
};