import { mapValues } from 'lodash';

export const THEME = 'theme';
export const APPEARANCE = 'appearance';

export const SETTING_URL = '/settings';
export const APPEARANCE_URL = `${SETTING_URL}/${APPEARANCE}`;
export const THEME_URL = `${SETTING_URL}/${THEME}`;

export const appearanceAnchorArr = {
  FOLDERS_ID: `#${APPEARANCE}_folders`,
  ATTRIBUTES_ID: `#${APPEARANCE}_attributes`,
  PAKEEPS_ID: `#${APPEARANCE}_pakeeps`,
  HEADER_ID: `#${APPEARANCE}_header`,
  LABELS_ID: `#${APPEARANCE}_labels`,
  EVENTS_ID: `#${APPEARANCE}_events`
};

export const ACCOUNT_URL = `${SETTING_URL}/account`;
export const SECURITY_URL = `${SETTING_URL}/security`;

export const themeAnchorArr = {
  COLORS_ID: `${THEME}_colors`,
  DEFAULT_THEMES_ID: `${THEME}_defaultThemes`,
  BORDER_RADIUS: `${THEME}_borderRadius`
};

export const themeAnchorIdArr = mapValues(themeAnchorArr, el => '#' + el);
