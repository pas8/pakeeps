import { $Values, Optional } from 'utility-types';
import { TypeNames } from './enums';

export type PayloadTypes = {
  [TypeNames.HANDLE_CHANGE_THEME_COLORS]: {
    newThemeColors: OptionalDefaultThemeType;
  };
};

export type ActionsValueTypes = {
  toChangeThemeColors: {
    type: typeof TypeNames.HANDLE_CHANGE_THEME_COLORS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS];
  };
};
export type ColorActionTypes = $Values<ActionsValueTypes>;

export type DefaultThemeType = {
  primaryMain: string;
  paperMain: string;
  isColorRandom:boolean
  defaultBackgroundMain: string;
  secondaryMain: string;
  type: 'dark' | 'light';
  highEmphasis: string;
  mediumEmphasis: string;
  caption: string;
  maxEmphasis: string;
};

export type OptionalDefaultThemeType = Optional<DefaultThemeType>;

export type ColorInitialStateType = {
  breakpointsValues: {
    [key: string]: number;
  };
  theme: DefaultThemeType;
  idColumnArr: {
    [key: string]: string[];
  };
};
