import { SwitchProps } from '@material-ui/core';
import { ColorType } from 'store/modules/App/types';
import { Omit } from 'utility-types';

export type SwitchByPasPropsType = { isBgIsPaper?: boolean } & Omit<SwitchProps, 'color'> & { color?: string };
