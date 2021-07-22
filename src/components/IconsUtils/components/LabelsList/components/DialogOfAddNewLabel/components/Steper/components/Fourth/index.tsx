import { FormControlLabel, Switch } from '@material-ui/core';
import SwitchByPas from 'components/Switch';
import { useGetSwitchCustomColorOfDialogSteper } from 'hooks/useGetSwitchCustomColorOfDialogSteper.hook';
import { FC } from 'react';

const FourthStepOfSteperOfDialogOfAddNewLabel: FC<any> = ({ customColor, ...switchProps }) => {
  const newCustomColor = useGetSwitchCustomColorOfDialogSteper(customColor);
  return <SwitchByPas {...switchProps} isBgIsPaper title={'Is variant Outlined?'} customColor={newCustomColor} />;
};

export default FourthStepOfSteperOfDialogOfAddNewLabel;
