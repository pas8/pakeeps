import { FormControlLabel, Switch, SwitchProps } from '@material-ui/core';
import { FC } from 'react';
import SwitchByPas from 'components/Switch';
import { DEFAULT } from 'models/denotation';
import { UseStylesCustomColorType } from 'models/types';
import { useGetSwitchCustomColorOfDialogSteper } from 'hooks/useGetSwitchCustomColorOfDialogSteper.hook';

const SecondStepOfSteperOfDialogOfAddNewLabel: FC<SwitchProps & UseStylesCustomColorType> = ({
  customColor,
  ...switchProps
}) => {
  const newCustomColor = useGetSwitchCustomColorOfDialogSteper(customColor);
  return <SwitchByPas {...switchProps} isBgIsPaper title={'Is variant Outlined?'} customColor={newCustomColor} />;
};

export default SecondStepOfSteperOfDialogOfAddNewLabel;
