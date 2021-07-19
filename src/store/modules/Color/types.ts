import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
import { StringNullableChain } from 'lodash';
import { $Values, Optional } from 'utility-types';
import { TypeNames } from './enums';

export type PayloadTypes = {
  [TypeNames.HANDLE_CHANGE_THEME_COLORS]: {
    newThemeColors: OptionalDefaultThemeType;
  };

  [TypeNames.HANDLE_CHANGE_DEFAULT_THEMES_ARR]: {
    newThemeElement: ElementOfDefaultThemeToChoseArr;
  };

  [TypeNames.HANDLE_CHANGE_ONE_COLOR_COLUMN]: {
    columnId: string;
    newArr: string[];
  };
  [TypeNames.HANDLE_CHANGE_ONE_COLOR_COLUMN]: {
    columnId: string;
    newArr: string[];
  };
  [TypeNames.HANDLE_CHANGE_TWO_COLOR_COLUMN]: {
    startColumn: {
      id: string;
      newArr: ItemValueOfIdColumnArrType;
    };
    finishColumn: {
      id: string;
      newArr: ItemValueOfIdColumnArrType;
    };
  };
};

export type ActionsValueTypes = {
  HANDLE_CHANGE_ONE_COLOR_COLUMN: {
    type: typeof TypeNames.HANDLE_CHANGE_ONE_COLOR_COLUMN;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ONE_COLOR_COLUMN];
  };

  HANDLE_CHANGE_TWO_COLOR_COLUMN: {
    type: typeof TypeNames.HANDLE_CHANGE_TWO_COLOR_COLUMN;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_TWO_COLOR_COLUMN];
  };

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
  borderRadius: number;
  textColor: string;
  // maxEmphasis: string;
};

export type OptionalDefaultThemeType = Optional<DefaultThemeType>;

export type ElementOfDefaultThemeToChoseArr = {
  caption: string;
  id: string;
  background: { default: string; paper: string; type: string; textColor: string };
};

export type ItemValueOfIdColumnArrType = string[];
export type IdColumnArrType = {
  [key: string]: ItemValueOfIdColumnArrType;
};

export type ColorInitialStateType = {
  textColorCoefficients: {
    max: number;
    high: number;
    medium: number;
    min: number;
  };
  defaultThemesToChoseArr: ElementOfDefaultThemeToChoseArr[];

  breakpointsValues: BreakpointValues;
  theme: DefaultThemeType;
  idColumnArr: IdColumnArrType;
};
