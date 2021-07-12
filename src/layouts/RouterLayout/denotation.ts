export const BASE_URL = '/';

export const SETTINGS = 'settings';
export const THEME = 'theme';
export const APPEARANCE = 'appearance';
export const ACCOUNT = 'account';
export const SECURITY = 'security';

export const SETTINGS_BASE_URL = `/${SETTINGS}`;
export const SETTINGS_APPEARANCE_BASE_URL = `${SETTINGS_BASE_URL}/${APPEARANCE}`;
export const SETTINGS_THEME_BASE_URL = `${SETTINGS_BASE_URL}/${THEME}`;
export const SETTINGS_ACCOUNT_BASE_URL = `${SETTINGS_BASE_URL}/${ACCOUNT}`;
export const SETTINGS_SECURITY_BASE_URL = `${SETTINGS_BASE_URL}/${SECURITY}`;

export const appearanceIds = {
  FOLDERS: 'Folders',
  ATTRIBUTES: 'Attributes',
  PAKEEPS: 'Pakeeps',
  HEADER: 'Header'
};

export const settingUrls = {
  BASE: SETTINGS_BASE_URL,
  APPEARANCE: {
    BASE: SETTINGS_APPEARANCE_BASE_URL,
    [appearanceIds.FOLDERS]: `#${APPEARANCE}_${appearanceIds.FOLDERS}`,
    [appearanceIds.ATTRIBUTES]: `#${APPEARANCE}_${appearanceIds.ATTRIBUTES}`,
    [appearanceIds.PAKEEPS]: `#${APPEARANCE}_${appearanceIds.PAKEEPS}`,
    [appearanceIds.HEADER]: `#${APPEARANCE}_${appearanceIds.PAKEEPS}`
  },

  THEME: {
    BASE: SETTINGS_THEME_BASE_URL,
    COLORS_ID: `#${THEME}_colors`,
    DEFAULT_THEMES_ID: `#${THEME}_defaultThemes`,
    BORDER_RADIUS: `#${THEME}_borderRadius`
  },
  ACCOUNT: {
    BASE: SETTINGS_ACCOUNT_BASE_URL
  },
  SECURITY: {
    BASE: SETTINGS_SECURITY_BASE_URL,
    CHANGE_PASSWORD_ID: `#${SECURITY}_changePasswordId`
  }
};
