import { useRouter } from 'next/dist/client/router';
import { BASE_URL, settingUrls, SETTINGS, ACCOUNT, THEME, SECURITY, APPEARANCE } from 'layouts/RouterLayout/denotation';

import { drop, startsWith } from 'lodash';
import { UseTakeFoldersArrType } from 'models/types';
import {
  DefaultPropertyiesOfElementOfFolderArrType,
  ElementOfFolderArrType,
  FolderArrType,
  FoldersType
} from 'store/modules/App/types';
import { ALL, menuOpenStatusDenotation } from 'models/denotation';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGlobalEventsArr,
  getLabels,
  getGlobalFolderId,
  getPakeepFolderOrderNames
} from 'store/modules/App/selectors';
import { usePakeepFolders } from './usePakeepFolders.hook';
import { toChangeMenuOpenStatus, toChangeFolderOrderNames } from 'store/modules/App/actions';
import { useMeasure } from 'react-use';
import { useFindCorrectDefaultPageFoldres } from './useFindCorrectDefaultPageFoldres.hook';
import { useAddAdditionalArr } from './useAddAdditionalArr.hook';
import { useAddIdToFolder } from './useAddIdToFolder.hook';

export const useTakeFoldersArr: UseTakeFoldersArrType = ({
  isFoldersHaveDraweView,
  handleDrawerWidth,
  handleCloseFoldersWithDrawerView
}) => {
  const [ref, { width: buttonWidth, height: buttonHeight }] = useMeasure<HTMLDivElement>();

  const router = useRouter();
  const dispatch = useDispatch();

  const labels = useSelector(getLabels);
  const events = useSelector(getGlobalEventsArr);
  const globalFolderId = useSelector(getGlobalFolderId);
  const folderOrderNames = useSelector(getPakeepFolderOrderNames);

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

  const defaultFoldersBefore = {};
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
    CLOSE_MENU: {
      label: 'closeMenu',
      arr: closeMenuFolderArr
    }
  });

  const defaultPakeepFolders = usePakeepFolders({ events, labels });

  const correctDefaultPageFolders = useFindCorrectDefaultPageFoldres({
    defaultFoldersBefore,
    defaultForderAfter,
    defaultSettingsFolders,
    defaultPakeepFolders
  });

const newFolderOrderNames

  const allFolders = isFoldersHaveDraweView
    ? { ...closeMenuFolders, correctDefaultPageFolders }
    : correctDefaultPageFolders;

  return { ref, folderOrderNames, foldersAfter, fordersBefore };

  // const defaultAllFolders = startsWith(router.pathname, SETTING_URL) ? validatedSettingFolders : pakeepFolders;

  // const allFolders = isFoldersHaveDraweView ? allFoldersWithDrawerView : defaultAllFolders;
  // const flattenAllFolders = _.flatten(allFolders);
};
