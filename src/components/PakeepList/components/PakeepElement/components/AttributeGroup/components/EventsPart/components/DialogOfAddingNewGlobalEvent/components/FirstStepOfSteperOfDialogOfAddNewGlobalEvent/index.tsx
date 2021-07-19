import { FormControlLabel, Switch, SwitchProps } from '@material-ui/core';
import SliderByPas from 'components/Slider';
import SwitchByPas from 'components/Switch';
import { DEFAULT } from 'models/denotation';
import { UseStylesCustomColorType } from 'models/types';
import { FC } from 'react';

const FirstStepOfSteperOfDialogOfAddNewGlobalEvent: FC<SwitchProps & UseStylesCustomColorType> = ({
  customColor,
  ...switchProps
}) => (
  <SwitchByPas
  
    {...switchProps}
    isBgIsPaper
    title={'Is event have only time '}
    color={customColor.isUseDefault ? DEFAULT : customColor.hover}
  />
);

export default FirstStepOfSteperOfDialogOfAddNewGlobalEvent;
