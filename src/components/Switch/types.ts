import { SwitchProps } from '@material-ui/core';
import { ColorType } from 'store/modules/App/types';

export type SwitchByPasPropsType = { isBgIsPaper?: boolean } & SwitchProps & { color?: string };
