import { ReactNode } from 'react';
import { ColorInitialStateType } from 'store/modules/Color/interfaces';
import { AppInitialStateInteface } from '../store/modules/App/types';

export type RootStoreType = {
  app: AppInitialStateInteface;
  color: ColorInitialStateType;
};

export type LayoutChildrenType =  { children: ReactNode }