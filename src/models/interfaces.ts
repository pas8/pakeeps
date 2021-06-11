import { SettingsInitialStateType } from 'store/modules/Settings/types';
import { ReactNode } from 'react';
import { ColorInitialStateType } from 'store/modules/Color/interfaces';
import { AppInitialStateInteface } from 'store/modules/App/types';

export type RootStoreType = {
  app: AppInitialStateInteface;
  color: ColorInitialStateType;
  settings: SettingsInitialStateType;
};

export type LayoutChildrenType = { children: ReactNode };

export type AllElementsIsBooleanType = {
  [key: string]: boolean;
};
