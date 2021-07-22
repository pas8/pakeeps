import { FormControlLabel, Switch, SwitchProps } from '@material-ui/core';
import SliderByPas from 'components/Slider';
import SwitchByPas from 'components/Switch';
import { useGetSwitchCustomColorOfDialogSteper } from 'hooks/useGetSwitchCustomColorOfDialogSteper.hook';
import { DEFAULT } from 'models/denotation';
import { UseStylesCustomColorType } from 'models/types';
import { FC } from 'react';

const FirstStepOfSteperOfDialogOfAddNewGlobalEvent: FC<SwitchProps & UseStylesCustomColorType> = ({
  customColor,
  ...switchProps
}) => {
  const newCustomColor = useGetSwitchCustomColorOfDialogSteper(customColor);

  return (
    <SwitchByPas
      {...switchProps}
      isBgIsPaper
      customColor={newCustomColor}
      title={'Is event have only time '}
      color={customColor.isUseDefault ? DEFAULT : customColor.secondaryColor}
    />
  );
};

export default FirstStepOfSteperOfDialogOfAddNewGlobalEvent;
