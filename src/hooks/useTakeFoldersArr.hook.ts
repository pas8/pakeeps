import { useRouter } from 'next/dist/client/router';
import { BASE_URL, settingUrls, SETTINGS } from 'layouts/RouterLayout/denotation';

import { startsWith } from 'lodash';
import { UseTakeFoldersArrType } from 'models/types';
import { ElementOfFolderArrType, FoldersType } from 'store/modules/App/types';
import { ALL } from 'models/denotation';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useSelector } from 'react-redux';
import { getGlobalEventsArr, getLabels, getGlobalFolderId } from 'store/modules/App/selectors';
import { usePakeepFolders } from './usePakeepFolders.hook';
import { toChangeMenuOpenStatus } from 'store/modules/App/actions';

export const useTakeFoldersArr: UseTakeFoldersArrType = ({
  folderOrderNames,
  folders,
  isFoldersHaveDraweView,
  handleCloseFoldersWithDrawerView,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const labels = useSelector(getLabels);
  const events = useSelector(getGlobalEventsArr);
  const globalFolderId = useSelector(getGlobalFolderId);

  const defaultPakeepDolders = usePakeepFolders({ events, labels });

  const handleHideFolder = () => {
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus: menuOpenStatusDenotation.HIDDEN }));
    setTimeout(() => {
      handleDrawerWidth(0);
    }, 400);
  };


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

  const defailtSettingsFolders = 
    [
      { title: 'Account', iconName: 'account', id: 'folder-account', color: 'default', route: ACCOUNT_URL },

      { title: 'Theme', iconName: 'color', id: 'folder-theme', color: 'default', route: THEME_URL },

      {
        title: 'Colors',
        iconName: 'none',
        parentRoute: THEME_URL,
        id: themeAnchorIdArr.COLORS_ID,
        color: 'default',
        route: themeAnchorIdArr.COLORS_ID
      },
      {
        title: 'Themes',
        iconName: 'none',
        parentRoute: THEME_URL,
        id: themeAnchorIdArr.DEFAULT_THEMES_ID,
        color: 'default',
        route: themeAnchorIdArr.DEFAULT_THEMES_ID
      },
      {
        title: 'Border_Radius',
        iconName: 'none',
        parentRoute: THEME_URL,
        id: themeAnchorIdArr.BORDER_RADIUS,
        color: 'default',
        route: themeAnchorIdArr.BORDER_RADIUS,
        isAncholElementLast: true
      },

      {
        title: 'Security',
        iconName: 'security',
        id: 'folder-security',
        color: 'default',
        route: SECURITY_URL
      },
      {
        title: 'Appearance',
        // isFolderIsPlaceholder: true,
        iconName: 'view',
        id: 'folder-appearance',
        color: 'default',
        route: APPEARANCE_URL
      },
      {
        title: 'Pakeeps',
        // iconName: '',
        parentRoute: APPEARANCE_URL,
        id: 'folder-appearance-pakeeps',
        color: 'default',
        route: appearanceAnchorArr.PAKEEPS_ID
      },
      // {
      //   title: 'Header',
      //   // iconName: 'header',
      //   id: 'folder-appearance-header',
      //   color: 'default',
      //   route: appearanceAnchorArr.Head
      // },
      {
        title: 'Folders',
        parentRoute: APPEARANCE_URL,
        // iconName: 'folder',
        id: 'folder-appearance-folder',
        color: 'default',
        route: appearanceAnchorArr.FOLDERS_ID
      },

      {
        title: 'Attributes',
        parentRoute: APPEARANCE_URL,
        // iconName: 'label',
        id: 'folder-appearance-Attributes',
        color: 'default',
        route: appearanceAnchorArr.ATTRIBUTES_ID
      }
    ]
  

  const pakeepFolders = [...folders, ...utilsFolders];

  const goToPakeepsArr = [
    {
      title: 'To_pakeeps',
      iconName: 'arrowBack',
      id: 'folder-arrowBack',
      onClick: handleGoToPakeep,
      color: 'default'
    }
  ];

  const defaultAllFolders = startsWith(router.pathname, SETTING_URL) ? validatedSettingFolders : pakeepFolders;

  const allFolders = isFoldersHaveDraweView ? allFoldersWithDrawerView : defaultAllFolders;
  const flattenAllFolders = _.flatten(allFolders);
};
