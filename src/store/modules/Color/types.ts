import { $Values, Optional } from 'utility-types';
import { TypeNames } from './enums';

export type PayloadTypes = {
  [TypeNames.HANDLE_CHANGE_THEME_COLORS]: {
    newThemeColors: OptionalDefaultThemeType;
  };

  [TypeNames.HANDLE_CHANGE_DEFAULT_THEMES_ARR]: {
    newThemeElement: ElementOfDefaultThemeToChoseArr;
  };
};

export type ActionsValueTypes = {
  toChangeThemeColors: {
    type: typeof TypeNames.HANDLE_CHANGE_THEME_COLORS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_COLORS];
  };
  toChangeDefaultThemesArr: {
    type: typeof TypeNames.HANDLE_CHANGE_DEFAULT_THEMES_ARR;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_DEFAULT_THEMES_ARR];
  };
};
export type ColorActionTypes = $Values<ActionsValueTypes>;

export type DefaultThemeType = {
  primaryMain: string;
  paperMain: string;
  isColorRandom: boolean;
  defaultBackgroundMain: string;
  secondaryMain: string;
  type: 'dark' | 'light';
  // highEmphasis: string;
  // mediumEmphasis: string;
  caption: string;
  textColor: string;
  // maxEmphasis: string;
};

export type OptionalDefaultThemeType = Optional<DefaultThemeType>;

export type ElementOfDefaultThemeToChoseArr = {
  caption: string;
  id:string;
  background: { default: string; paper: string; type: string; textColor: string };
};

export type ColorInitialStateType = {
  textColorCoefficients: {
    max: number;
    high: number;
    medium: number;
    min: number;
  };
  defaultThemesToChoseArr: ElementOfDefaultThemeToChoseArr[];

  breakpointsValues: {
    [key: string]: number;
  };
  theme: DefaultThemeType;
  idColumnArr: {
    [key: string]: string[];
  };
};
