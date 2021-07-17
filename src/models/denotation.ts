export const pakeepPropertyiesNames = {
  isInBookmark: 'isInBookmark',
  isFavorite: 'isFavorite',
  isArchived: 'isArchived',
  isPinned: 'isPinned',
  isCheckBoxes: 'isCheckBoxes'
} as const;

export const menuOpenStatusDenotation = {
  HIDDEN: 'HIDDEN',
  OPEN: 'OPEN',
  EXTENDED: 'EXTENDED'
} as const;

export const SIGN_IN_URL = '/auth';
export const NEW_USER_URL = '/auth/register';

export const TRANSPARENT = 'transparent';
export const NONE = 'none';

export const DEFAULT = 'default';
export const OUTLINED = 'outlined';
export const PRIMARY = 'primary';
export const SECONDARY = 'secondary';

export const attributesName = {
  EVENT: 'event',
  LABEL: 'label'
};

export const ALL = 'ALL';
export const OPEN_MORE = 'OPEN_MORE';

export const headerProfileUtilsDenotationIds = {
  UPLOAD_BUTTON: 'UPLOAD_BUTTON',
  THEME_CHANGER_BUTTON: 'THEME_CHANGER_BUTTON',
  NOTICATION_BUTTON: 'NOTICATION_BUTTON',
  LOCK_BUTTON: 'LOCK_BUTTON',
  ZEN_MODE_BUTTON: 'ZEN_MODE_BUTTON',
  AVATAR_BUTTON: 'AVATAR_BUTTON',
  SIGNOUT: 'SIGNOUT',
  ACCOUNT: 'ACCOUNT'
};

export const CLOSE_MENU_ID = 'CLOSE_MENU';
export const HEADER_PROPFILE_UTILS_FOLDER = 'HEADER_PROPFILE_UTILS_FOLDER';

export const pakeeepsSearchColorPropertyies = {
  backgroundColor: 'backgroundColor',
  color: 'color'
};

export const allPakeeepsSearchPropertyies = {
  ...pakeeepsSearchColorPropertyies,
  title: 'title',
  text: 'text',
  [NONE]: NONE
};

export const pakeepFoldersKeyName = {
  PAKEEP_UTILS: 'PAKEEP_UTILS',
  LABELS: 'LABELS',
  EVENTS: 'EVENTS',
  SEARCH: 'SEARCH'
};
