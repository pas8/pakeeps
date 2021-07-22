import { SwitchProps } from '@material-ui/core';
import { CustomColorType, UseStylesCustomColorType } from 'models/types';
import { ColorType } from 'store/modules/App/types';
import { Omit, Optional } from 'utility-types';

export type UseStylesOfSwitchByPasType = {
  isBgIsPaper?: boolean;
  isChecked?: boolean;
} & { color?: string } 

export type SwitchByPasPropsType = Omit<SwitchProps, 'color'> & UseStylesOfSwitchByPasType &Optional<UseStylesCustomColorType>;
