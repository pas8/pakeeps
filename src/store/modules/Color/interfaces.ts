import { colorInitialState, defaultTheme } from './reducers';

export type DefaultThemetype =  {
  primaryMain: string;
  paperMain: string;
  defaultBackgroundMain: string;
  secondaryMain: string;
  type: 'dark' | 'light';
  highEmphasis: string;
  mediumEmphasis: string;
  maxEmphasis: string;
}
export type ColorInitialStateType = typeof colorInitialState
