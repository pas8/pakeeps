import { themeAnchorIdArr } from "layouts/RouterLayout/denotation";

import {
  ACCOUNT_URL,
  appearanceAnchorArr,
  APPEARANCE_URL,
  SETTING_URL,
  THEME,
  THEME_URL
} from 'layouts/RouterLayout/denotation';

export const useTakeFoldersArr = () => {


  const handleOpenSetting = () => {
    handleChange('placeholder', 1);
    router.push(ACCOUNT_URL);
  };

  // const previuosValue = usePrevious(value)
  const handleGoBack = () => {
    router.back();
    // handleChange('placeholder', previuosValue);
  };

  const handleGoToPakeep = () => {
    router.push('/');
  };

  const allFoldersWithDrawerView = [
    [
      {
        title: 'Close menu',
        iconName: 'close',
        id: 'folder-close',
        onClick: handleCloseFoldersWithDrawerView,
        color: 'default'
      }
    ],
    ...defaultAllFolders
  ];
  const utilsFolders = [
    [
      { title: 'Open settings1', iconName: 'settings', id: 'folder-94', onClick: handleOpenSetting, color: 'default' },
      { title: 'Hide folders2', iconName: 'visibility', onClick: handleHideFolder, id: 'folder-93', color: 'default' }
    ]
  ];



  const settingsFolders = [
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
  ];


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


  const validatedSettingFolders = isFoldersHaveDraweView ? settingsFolders : [goToPakeepsArr, ...settingsFolders];

  const defaultAllFolders = _.startsWith(router.pathname, SETTING_URL) ? validatedSettingFolders : pakeepFolders;



  const allFolders = isFoldersHaveDraweView ? allFoldersWithDrawerView : defaultAllFolders;
  const flattenAllFolders = _.flatten(allFolders);

}