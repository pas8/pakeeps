import { FormControlLabel, Switch, SwitchProps } from '@material-ui/core';
import SwitchByPas from 'components/Switch';
import { DEFAULT } from 'models/denotation';
import { UseStylesCustomColorType } from 'models/types';
import { FC } from 'react';

const SecondStepOfSteperOfDialogOfAddNewLabel: FC<SwitchProps & UseStylesCustomColorType> = ({
  customColor,
  ...switchProps
}) => (
  <SwitchByPas
    {...switchProps}
    isBgIsPaper
    title={'Is variant Outlined?  '}
    color={customColor.isUseDefault ? DEFAULT : customColor.hover}
  />
);

export default SecondStepOfSteperOfDialogOfAddNewLabel;
